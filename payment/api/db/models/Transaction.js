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

        // Assume that you have a field 'state' in the Operation model representing its state
        // You may need to adjust this logic based on your actual application requirements
        const operation = await Operation.findByPk(transaction.operation_id);
        if (operation) {
            operation.state = "completed"; // Update the state to 'completed' (or any other desired state)
            await operation.save({ fields: ["state"] });
        }
        await TransactionHistory.create({
            transaction_state: transaction.transaction_state,
            transaction_id: transaction.transaction_id,
            transaction_date: transaction.transaction_date
        })
    });

    // Add hook to update the operation_date
    Transaction.addHook("afterUpdate", async (transaction, options) => {
        if (transaction.changed('s', 'completed')) {
            await TransactionHistory.create({
                transaction_state: transaction.transaction_state,
                transaction_id: transaction.transaction_id,
                transaction_date: transaction.transaction_date
            })
        }
    })

    return Transaction;
};
