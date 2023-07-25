const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
    class Client extends Model {
        async checkPassword(password) {
            const bcrypt = require("bcryptjs");
            return bcrypt.compare(password, this.password);
        }

        generateToken() {
            const jwt = require("jsonwebtoken");
            return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
                expiresIn: "1y",
            });
        }
    }

    Client.init({
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        address: DataTypes.STRING,
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8],
                    msg: "Password must be at least 8 characters long",
                },
                is: {
                    args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    msg: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
                },
            },
        },
    },
    {
        sequelize: connection,
        tableName: "clients",
        hooks: {
            beforeSave: async (client, options) => {
                if (client.changed("password")) {
                    const bcrypt = require("bcryptjs");
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(client.password, salt);
                    client.password = hash;
                }
            },
        },
    });

    return Client;
};
