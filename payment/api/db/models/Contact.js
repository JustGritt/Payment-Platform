const { Model, DataTypes } = require("sequelize");

module.exports = function (connection) {
  class Contact extends Model {
    static associate(models) {
        Contact.belongsTo(models.Merchant, { foreignKey: "merchant_id" });
    }
  }

  Contact.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
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
