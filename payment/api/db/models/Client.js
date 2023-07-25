const { DataTypes } = require("sequelize");

module.exports = function (connection) {
    const Client = connection.define("Client", {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: {
                    msg: "Email cannot be empty",
                },
            },
        },
        country: DataTypes.STRING,
        address: DataTypes.STRING,
        creditCard: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                // isCreditCard: true,
                notEmpty: {
                    msg: "You have to provide a valid credit card number",
                },
            },
        }
    }, {
        sequelize: connection,
        tableName: "clients",
    });

    // Uncomment the hook if you have defined the checkEmailValidity function
    // Client.addHook("beforeCreate", checkEmailValidity);

    return Client;
};