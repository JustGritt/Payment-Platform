const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const TransactionState = connection.define("TransactionState", {
        transaction_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
    }, {
        sequelize: connection,
        tableName: "transaction_states", // Correct table name
    });

    // Transaction
    TransactionState.belongsTo(connection.models.Transaction, {
        foreignKey: 'transaction_id',
    });

    // TODO: Add hook later
    // TransactionState.addHook("beforeCreate", updateTransactionHistory);

    return TransactionState;
};