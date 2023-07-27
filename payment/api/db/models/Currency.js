const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
    class Currency extends Model {
        static associate(models) {}
    }

    Currency.init(
        {
            currency_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
        },
        {
            sequelize: connection,
            tableName: "currencies",
        }
    );

    return Currency;
};
