const { DataTypes } = require("sequelize");
const TransactionStateModel = require("../models/transactionState");

module.exports = {
  up: async (queryInterface) => {
    // Define the data for the transaction states
    const transactionStatesData = [
      {
        name: "capture",
      },
      {
        name: "completed",
      },
      {
        name: "cancelled",
      },
      {
        name: "partial-refund",
      },
      {
        name: "full-refund",
      },
    ];

    // Insert the data into the `transaction_states` table
    await queryInterface.bulkInsert("transaction_states", transactionStatesData, {});

    // If you need to update the transactionState model to use autoIncrement on id:
    const connection = queryInterface.sequelize;
    const TransactionState = TransactionStateModel(connection);

    // Sync the model with the database to add the autoIncrement property to id
    await TransactionState.sync();
  },

  down: async (queryInterface) => {
    // Remove the data for the transaction states
    await queryInterface.bulkDelete("transaction_states", null, {});
  },
};
