const { Sequelize } = require("sequelize");
const Joi = require("joi");
const { Transaction, Currency, Client, TransactionState, Operation } = require("../db"); // Assuming the Transaction model is defined in "../db"
const ValidationError = require("../errors/ValidationError");
const { getDb } = require('../db/mongoConnection'); 


module.exports = {
  findAll: async function (criteria, options = {}) {
    return Transaction.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || []),
    });
  },
  findById: async function (id) {
    return Transaction.findByPk(id);
  },
  pay: async function (args) {
    const { id, clientData, operation_id } = args;
    const transaction = await Transaction.findByPk(id);
    if (clientData) {
      let client;
      client = await Client.findOne({ where: { email: clientData.email } });
      if (client === null) {
        client = await Client.create(clientData)
      }
      transaction.client_id = client.dataValues.client_id
    }
    const operation = await Operation.findByPk(operation_id);
    operation.status = "completed"
    operation.save({ fields: ["status"] })
    const transaction_state = await TransactionState.findOne({
      where: {
        name: "completed",
      }
    });
    if (transaction_state) {
      transaction.transaction_state = transaction_state.dataValues.transaction_id;
    }
    transaction.operation_id = operation_id
    return await transaction.save({ fields: ["operation_id", "transaction_state", "client_id"] });
  },
  create: async function (data, user) {
    try {
      // if (!data.card_number)
      const currencies = await Currency.findAll().then((rows) => {
        return rows.map((r) => {
          return r.dataValues;
        })
      })
      data.merchant_id = user.merchant_id
      const shemaValidation = Joi.object({
        currency: Joi.string().valid(...currencies.map((r) => r.name)).required(),
        merchant_id: Joi.number(),
        amount: Joi.number().required(),
      })
      const { error } = shemaValidation.validate(data)
      if (error) throw new ValidationError(error.message);

      data.transaction_amount = data.amount

      const currency = await Currency.findOne({ where: { name: data.currency } });
      if (currency === null) throw new ValidationError("Invalid currency");
      data.currency_id = currency.dataValues.currency_id

      return await Transaction.create(data);
    } catch (e) {
      console.log(e);
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  searchByTransactionId: async function(transactionId) {
    try {
        const dbInstance = getDb();
        const collection = dbInstance.collection('transactions');

        // Convertir l'ID de transaction en Int32 avant de rechercher
        const intTransactionId = parseInt(transactionId, 10);
        const transaction = await collection.findOne({ "transaction_history.transaction_id": intTransactionId });

        return transaction;

    } catch (e) {
        console.error(e);
        throw e; 
    }
},
  update: async function (criteria, data) {
    try {
      const [nb, clients = []] = await Transaction.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      return clients;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Transaction.destroy({
      where: criteria,
    });
  },
};