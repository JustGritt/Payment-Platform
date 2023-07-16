const { Model, DataTypes, UUID, UUIDV4 } = require("sequelize");

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
                foreignKey: "transaction_state",
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
            allowNull: false,
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
        const operation = await Operation.findByPk(transaction.operation_id);
        if (operation) {
            operation.state = "completed"; // Update the state to 'completed' (or any other desired state)
            await operation.save({ fields: ["state"] });
        }
    
        // Obtenir toutes les transactions précédentes pour le même merchant_id (pour l'historique)
        const allTransactionsForMerchant = await Transaction.findAll({
            where: { merchant_id: transaction.merchant_id },
            order: [['transaction_date', 'DESC']]
        });
    
        // Récupérer toutes les opérations associées à cette transaction
        const operationsForTransaction = await Operation.findAll({
            where: { transaction_id: transaction.transaction_id }
        });
    
        const db = getDb();
        const collection = db.collection('transactions');
        const document = {
            merchant_id: transaction.merchant_id,
            transaction: transaction.dataValues,
            transaction_history: allTransactionsForMerchant, // Historique des transactions
            operations: operationsForTransaction  // Opérations associées
        };
        await collection.insertOne(document);
    });
    

    return Transaction;
};
