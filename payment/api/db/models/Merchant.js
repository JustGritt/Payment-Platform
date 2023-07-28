const { Model, DataTypes, UUID, UUIDV4 } = require("sequelize");

module.exports = function (connection) {
    class Merchant extends Model {
        async checkPassword(password) {
            const bcrypt = require("bcryptjs");
            return bcrypt.compare(password, this.password);
        }

        generateToken() {
            const jwt = require("jsonwebtoken");
            return jwt.sign({ id: this.merchant_id }, process.env.JWT_SECRET, {
                expiresIn: "1y",
            });
        }
        static associate(models) {
            Merchant.hasOne(models.Currency, {
                foreignKey: "currency_id",
            });
            Merchant.hasMany(models.Contact, { foreignKey: "merchant_id" });
        }
    }

    Merchant.init({
        merchant_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8],
                    msg: "Password must be at least 8 characters long",
                },
            },
        },
        kbis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        redirectUrlConfirmation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        redirectUrlCancellation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isvalid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        currency_id: DataTypes.INTEGER,
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        client_token: {
            type: DataTypes.UUID,
            unique: true,
            defaultValue: UUIDV4,
        },
        client_secret: {
            type: DataTypes.UUID,
            unique: true,
            defaultValue: UUIDV4,
        }
    },
        {
            sequelize: connection,
            tableName: "merchants",
            hooks: {
                beforeCreate: async (client, options) => {
                    const bcrypt = require("bcryptjs");
                    const salt_password = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(client.password, salt_password);
                    client.password = hash;
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