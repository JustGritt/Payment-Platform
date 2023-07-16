const { Model, DataTypes } = require("sequelize");
const { getDb } = require('../mongoConnection'); // adjust the path accordingly


module.exports = function (connection) {
    class Operation extends Model {
        static associate(models) {
            Operation.belongsTo(models.Transaction, {
                foreignKey: "transaction_id",
            });
        }
    }

    Operation.init(
        {
            operation_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            status: DataTypes.STRING, // Refund - Pending - Success - Failed
            transaction_id: DataTypes.INTEGER,
            card_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "You have to provide a valid card number",
                    },
                },
            },
            card_expiry_date: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
                }
            },
        },
        {
            sequelize: connection,
            tableName: "operations",
        }
    );

    Operation.addHook("afterCreate", async (operation, options) => {
        const db = getDb();
        const collection = db.collection('merchant_operations');
    
        // Récupérez la transaction associée à cette opération pour obtenir le merchant_id
        const Transaction = connection.models.Transaction;
        const relatedTransaction = await Transaction.findByPk(operation.transaction_id);
        const merchantId = relatedTransaction.merchant_id;
    
        // Recherchez le document avec le merchant_id donné
        const existingDocument = await collection.findOne({ merchant_id: merchantId });
    
        if (existingDocument) {
            // Si le document existe, mettez-le à jour avec la nouvelle opération
            existingDocument.operations.push(operation.dataValues);
    
            // Enregistrez les modifications
            await collection.updateOne(
                { merchant_id: merchantId },
                { $set: existingDocument }
            );
        } else {
            // Si le document n'existe pas, créez un nouveau document pour le merchant_id
            const document = {
                merchant_id: merchantId,
                operations: [operation.dataValues]
            };
            await collection.insertOne(document);
        }
    });
    

    return Operation;
};
