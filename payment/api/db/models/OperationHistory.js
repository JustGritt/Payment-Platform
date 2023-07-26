const {Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
    class OperationHistory extends Model {
        static associate(models) {
            OperationHistory.belongsTo(models.Operation, {
                foreignKey: "operation_id",
            });

            OperationHistory.belongsTo(models.Transaction, {
                foreignKey: "transaction_id",
            });
        }
    }

    OperationHistory.init(
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

    // Add hook to update the operation_date
    OperationHistory.addHook("beforeCreate", (history, options) => {
        history.operation_date = new Date();
    });

    return OperationHistory;
};
