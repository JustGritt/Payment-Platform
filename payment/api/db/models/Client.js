const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
    class Client extends Model {}

    Client.init({
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: {
                    msg: "Email cannot be null",
                },
            },
        }
    },
        {
            sequelize: connection,
            tableName: "clients",
            hooks: {},
        });

    return Client;
};
