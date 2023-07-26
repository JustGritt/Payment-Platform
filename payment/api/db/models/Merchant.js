const { Model, DataTypes, UUID, UUIDV4 } = require("sequelize");

module.exports = function (connection) {
    class Merchant extends Model {
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
        static associate(models) {
            Merchant.hasOne(models.Currency, {
                foreignKey: "currency_id",
            });
        }
    }

    Merchant.init({
        merchant_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        kbis: DataTypes.STRING,
        redirect_success: DataTypes.STRING,
        redirect_cancel: DataTypes.STRING,
        currency_id: DataTypes.INTEGER,
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
        is_active: DataTypes.BOOLEAN,
        client_token: {
            type: DataTypes.STRING,
            unique: true,
        },
        client_secret: {
            type: DataTypes.STRING,
            unique: true,
        }
    },
        {
            sequelize: connection,
            tableName: "merchants",
            hooks: {
                beforeCreate: async (client, options) => {
                    const bcrypt = require("bcryptjs");
                    const salt = await bcrypt.genSalt(7);
                    const hash_client_token = await bcrypt.hash(UUIDV4.toString(), salt);
                    const hash_client_secret = await bcrypt.hash(UUIDV4.toString(), salt);
                    client.client_token = hash_client_token;
                    client.client_secret = hash_client_secret;
                },
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

    return Merchant;
};
