const { Model, DataTypes, UUID, UUIDV4 } = require("sequelize");
const { getDb } = require('../mongoConnection');


module.exports = function (connection) {
    class Transaction extends Model {
        static associate(models) {
            Transaction.belongsTo(models.Merchant, {
                foreignKey: "merchant_id",
            });

            Transaction.hasOne(models.Client, {
                foreignKey: "client_id",
            });

            Transaction.hasOne(models.Currency, {
                foreignKey: "currency_id",
            });

            Transaction.hasMany(models.Operation, {
                foreignKey: "operation_id",
            });

            Transaction.hasOne(models.TransactionState, {
                foreignKey: "transaction_id",
            });
        }
    }
    Transaction.init({
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        operation_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        currency_id: DataTypes.INTEGER,
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        merchant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transaction_amount: DataTypes.FLOAT,
        transaction_state: DataTypes.INTEGER,
        transaction_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        transaction_uid: {
            type: UUID,
            defaultValue: UUIDV4,
            unique: true,
            allowNull: false,
        },
        // external_reference: DataTypes.STRING, // TODO: Add later if needed
    },
        {
            sequelize: connection,
            tableName: "transactions",
        }
    );

    // Add hook to update the transaction state
    Transaction.addHook("beforeCreate", async (transaction, options) => {
        const TransactionState = connection.models.TransactionState;
        const transaction_state = await TransactionState.findOne({
            where: {
                name: "capture",
            }
        });
        if (transaction_state) {
            transaction.transaction_state = transaction_state.dataValues.transaction_id;
        }
    })

    Transaction.addHook("afterCreate", async (transaction, options) => {
        const Operation = connection.models.Operation;
        const TransactionHistory = connection.models.TransactionHistory;
    
        const operation = await Operation.findByPk(transaction.operation_id);
        if (operation) {
            operation.state = "completed"; // Update the state to 'completed'
            await operation.save({ fields: ["state"] });
        }
    
        await TransactionHistory.create({
            transaction_state: transaction.transaction_state,
            transaction_id: transaction.transaction_id,
            transaction_date: transaction.transaction_date
        });
    
        // Récupérer toutes les opérations associées à cette transaction
        const operationsForTransaction = await Operation.findAll({
            where: { transaction_id: transaction.transaction_id }
        });
    
        const db = getDb();
        const collection = db.collection('transactions');
    
        // Recherchez le document avec le merchant_id donné
        const existingDocument = await collection.findOne({ merchant_id: transaction.merchant_id });
    
        if (existingDocument) {
            // Si le document existe, mettez-le à jour avec les nouvelles informations
    
            // Mettez à jour les KPI
            if (!existingDocument.kpi) existingDocument.kpi = {};
            
            // Increment the orderCount
            existingDocument.kpi.orderCount = (existingDocument.kpi.orderCount || 0) + 1;
            
            // Calculate the new averageAmount
            const totalAmount = (existingDocument.kpi.averageAmount || 0) * ((existingDocument.kpi.orderCount || 0) - 1) + transaction.transaction_amount;
            existingDocument.kpi.averageAmount = totalAmount / existingDocument.kpi.orderCount;
    
            // Mettez à jour l'historique des transactions et les opérations directement dans MongoDB
            await collection.updateOne(
                { merchant_id: transaction.merchant_id },
                {
                    $push: {
                        transaction_history: transaction.dataValues,
                        operations: { $each: operationsForTransaction }
                    },
                    $set: { 
                        kpi: existingDocument.kpi 
                    }
                }
            );
        } else {
            // Si le document n'existe pas, créez un nouveau document pour le merchant_id
            const document = {
                merchant_id: transaction.merchant_id,
                transaction_history: [transaction.dataValues], // Historique des transactions commence avec cette transaction
                operations: operationsForTransaction,  // Opérations associées
                kpi: {
                    orderCount: 1,
                    averageAmount: transaction.transaction_amount
                }
            };
            await collection.insertOne(document);
        }
    });
    
    return Transaction;
};