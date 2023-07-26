const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Merchant extends Model {
    static associate(models) {
        Merchant.hasMany(models.Contact, { foreignKey: "merchant_idmerchant" });
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
      isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      sequelize: connection,
      tableName: "merchants",
    }
  );
  
  return Merchant;
};
