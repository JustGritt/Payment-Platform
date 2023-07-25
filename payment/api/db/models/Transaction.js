const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const Transaction = connection.define("Transaction", {
        client_id: DataTypes.INTEGER,
        merchant_id: DataTypes.INTEGER,
        currency_id: DataTypes.INTEGER,
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "You have to provide a valid token",
                },
            },
        },
        amount: DataTypes.FLOAT,
        isRefund: DataTypes.BOOLEAN,
        transaction_date: DataTypes.DATE,
        // external_reference: DataTypes.STRING, // TODO: Add later if needed
    }, {
        sequelize: connection,
        tableName: "transactions", // Correct table name
    });

    // Define associations here if necessary
    Transaction.belongsTo(connection.models.Client, {
        foreignKey: 'client_id',
    });

    Transaction.belongsTo(connection.models.Currency, {
        foreignKey: 'currency_id',
    });

    // TODO: Add hook later
    // Transaction.addHook("beforeCreate", updateTransactionState);

    return Transaction;
};