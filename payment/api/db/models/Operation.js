const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const Operation = connection.define("Operation", {
        // client_id: DataTypes.INTEGER,
        transaction_id: DataTypes.INTEGER,
        card_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "You have to provide a valid card number",
                },
            },
        },
        card_expiry_date: DataTypes.DATE,
        amount: DataTypes.FLOAT,
        status: DataTypes.STRING,
    }, {
        sequelize: connection,
        tableName: "operations",
    });

    // Transaction
    Operation.belongsTo(connection.models.Transaction, {
        foreignKey: 'transaction_id',
    });

    // TODO: Add hook later
    // Operation.addHook("beforeCreate", updateOperationState);

    return Operation;
};