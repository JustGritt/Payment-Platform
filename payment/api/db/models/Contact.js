const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Contact extends Model {
    static associate(models) {
        Contact.belongsTo(models.Merchant, { foreignKey: "merchant_idmerchant" });
    }
  }

  Contact.init(
    {
      firstname: {
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
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize: connection,
      tableName: "contacts",
    }
  );

  return Contact;
};
