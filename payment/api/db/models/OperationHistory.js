const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const OperationHistory = connection.define("OperationHistory", {
        operation_id: DataTypes.INTEGER,
        transaction_id: DataTypes.INTEGER,
        operation_date: DataTypes.DATE,
    }, {
        sequelize: connection,
        tableName: "operation_history", // Correct table name
    });

    // Operation
    OperationHistory.belongsTo(connection.models.Operation, {
        foreignKey: 'operation_id',
    });

    // Transaction
    OperationHistory.belongsTo(connection.models.Transaction, {
        foreignKey: 'transaction_id',
    });

    // TODO: Add hook later
    // OperationHistory.addHook("beforeCreate", updateTransactionState);

    return OperationHistory;
};