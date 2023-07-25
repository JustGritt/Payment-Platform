const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const OperationHistory = connection.define(
        "OperationHistory",
        {
            history_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            operation_id: DataTypes.INTEGER,
            transaction_id: DataTypes.INTEGER,
            operation_date: DataTypes.DATE,
        },
        {
            sequelize: connection,
            tableName: "operation_history", // Correct table name
        }
    );

    // Define associations here if necessary
    OperationHistory.belongsTo(connection.models.Operation, {
        foreignKey: "operation_id",
    });

    OperationHistory.belongsTo(connection.models.Transaction, {
        foreignKey: "transaction_id",
    });

    // Add hook to update the operation_date
    OperationHistory.addHook("beforeCreate", (history, options) => {
        history.operation_date = new Date();
    });

    return OperationHistory;
};
