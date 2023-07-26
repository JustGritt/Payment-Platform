const {Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
    class TransactionState extends Model {}
    TransactionState.init({
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
    }, {
        sequelize: connection,
        tableName: "transaction_states", // Correct table name
    });

    // TODO: Add hook later
    // TransactionState.addHook("beforeCreate", updateTransactionHistory);

    return TransactionState;
};