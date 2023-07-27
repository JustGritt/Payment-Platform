const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
    class Operation extends Model {
        static associate(models) {
            Operation.belongsTo(models.Transaction, {
                foreignKey: "transaction_id",
            });
        }
    }

    Operation.init(
        {
            operation_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            }, // Refund - Pending - Success - Failed
            transaction_id: DataTypes.INTEGER,
            card_number: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "You have to provide a valid card number",
                    },
                },
            },
            card_expiry_date: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
                }
            },
        },
        {
            sequelize: connection,
            tableName: "operations",
        }
    );

    return Operation;
};
