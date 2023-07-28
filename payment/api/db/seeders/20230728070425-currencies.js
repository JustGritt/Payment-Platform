const { DataTypes } = require("sequelize");
const CurrencyModel = require("../models/Currency");

module.exports = {
  up: async (queryInterface) => {
    // Define the data for the currencies
    const currenciesData = [
      { name: "EUR" },
      { name: "NYP" },
      { name: "USD" },
    ];

    // Insert the data into the `currencies` table
    await queryInterface.bulkInsert("currencies", currenciesData, {});

    // If you need to update the currency model to use autoIncrement on currency_id:
    const connection = queryInterface.sequelize;
    const Currency = CurrencyModel(connection);

    // Sync the model with the database to add the autoIncrement property to currency_id
    await Currency.sync();
  },

  down: async (queryInterface) => {
    // Remove the data for the currencies
    await queryInterface.bulkDelete("currencies", null, {});
  },
};
