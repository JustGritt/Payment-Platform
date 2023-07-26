const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const TransactionHistory = connection.define("TransactionHistory", {
        transaction_id: DataTypes.INTEGER,
        transaction_state: DataTypes.STRING,
        transaction_date: DataTypes.DATE,
    }, {
        sequelize: connection,
        tableName: "transaction_history",
    });

    // Transaction
    TransactionHistory.belongsTo(connection.models.Transaction, {
        foreignKey: 'transaction_id',
    });

    // TODO: Update transaction state
    // TransactionHistory.addHook("beforeCreate", updateTransactionState);

    return TransactionHistory;
};