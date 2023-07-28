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
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            }, // Refund - Pending - Success - Failed
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
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize: connection,
            tableName: "operations",
        }
    );

    Operation.addHook("afterCreate", async (operation, options) => {
        const db = getDb();
        const collection = db.collection('transactions');
    
        // Récupérez la transaction associée à cette opération pour obtenir le transaction_uid
        const Transaction = connection.models.Transaction;
        console.log("operation", operation);
        const relatedTransaction = await Transaction.findByPk(operation.dataValues.transaction_id);
    
        // Ajoutez la nouvelle opération au tableau operations du document de la transaction
        await collection.updateOne(
            { transaction_uid: relatedTransaction.dataValues.transaction_uid },
            { $push: { operations: operation.dataValues } }
        );
    });
    
    

    return Operation;
};
