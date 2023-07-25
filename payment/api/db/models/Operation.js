const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const Operation = connection.define(
        "Operation",
        {
            operation_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            transaction_id: DataTypes.INTEGER,

            amount: DataTypes.FLOAT,
            status: DataTypes.STRING, // Refund - Pending - Success - Failed
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
        },
        {
            sequelize: connection,
            tableName: "operations",
        }
    );

    // Define associations here if necessary
    Operation.belongsTo(connection.models.Transaction, {
        foreignKey: "transaction_id",
    });

    // Add hook to update the operation state
    Operation.addHook("afterCreate", async (operation, options) => {
        operation.status = "Pending"; // Pending by default
        await operation.save({ fields: ["status"] });
    });

    return Operation;
};
