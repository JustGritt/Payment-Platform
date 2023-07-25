const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Merchant extends Model {
    static associate(models) {
        Merchant.hasMany(models.Contact, { foreignKey: "merchant_idmerchant" });
    }

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

  Merchant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          //is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        },
      },
      isvalid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kbis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirectUrlConfirmation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirectUrlCancellation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: "merchants",
    }
  );

  async function encryptPassword(merchant, options) {
    if (!options?.fields.includes("password")) {
      return;
    }
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(merchant.password, salt);
    merchant.password = hash;
  }

  Merchant.addHook("beforeCreate", encryptPassword);
  Merchant.addHook("beforeUpdate", encryptPassword);

  return Merchant;
};
