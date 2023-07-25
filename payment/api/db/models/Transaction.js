const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const Transaction = connection.define(
        "Transaction",
        {
            transaction_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            operation_id: DataTypes.INTEGER,
            currency_id: DataTypes.INTEGER,
            client_id: DataTypes.INTEGER,
            // merchant_id: DataTypes.INTEGER, // TODO: Add later

            transaction_amount: DataTypes.FLOAT,
            transaction_date: DataTypes.DATE,
            transaction_uid: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "You have to provide a valid token",
                    },
                },
            },
            creditCard: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "You have to provide a valid credit card number",
                    },
                },
            },
            creditCardExpiryDate: DataTypes.DATE,
            // external_reference: DataTypes.STRING, // TODO: Add later if needed
        },
        {
            sequelize: connection,
            tableName: "transactions",
        }
    );

    // Define associations here if necessary
    Transaction.belongsTo(connection.models.Client, {
        foreignKey: "client_id",
    });

    Transaction.belongsTo(connection.models.Currency, {
        foreignKey: "currency_id",
    });

    Transaction.belongsTo(connection.models.Operation, {
        foreignKey: "operation_id",
    });

    // Add hook to update the transaction state
    Transaction.addHook("afterCreate", async (transaction, options) => {
        const Operation = connection.models.Operation;

        // Assume that you have a field 'state' in the Operation model representing its state
        // You may need to adjust this logic based on your actual application requirements
        const operation = await Operation.findByPk(transaction.operation_id);
        if (operation) {
            operation.state = "completed"; // Update the state to 'completed' (or any other desired state)
            await operation.save({ fields: ["state"] });
        }
    });

    return Transaction;
};
