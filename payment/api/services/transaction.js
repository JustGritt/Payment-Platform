const { Sequelize } = require("sequelize");
const Joi = require("joi");
const { Transaction, Currency, Client } = require("../db"); // Assuming the Transaction model is defined in "../db"
const ValidationError = require("../errors/ValidationError");

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
  create: async function (data, user) {
    try {
      // if (!data.card_number)
      const currencies = await Currency.findAll().then((rows) => {
        return rows.map((r) => {
          return r.dataValues;
        })
      })
      console.log(user);
      data.merchant_id = user.id
      const shemaValidation = Joi.object({
        currency: Joi.string().valid(...currencies.map((r) => r.name)).required(),
        merchant_id: Joi.number(),
        amount: Joi.number().required(),
        client: Joi.object({
          email: Joi.string().email().required(),
          firstname: Joi.string(),
          lastname: Joi.string(),
          phone_number: Joi.string(),
          address: Joi.string(),
          address2: Joi.string(),
        }).required(),
      })
      const { error } = shemaValidation.validate(data)
      if (error) throw new ValidationError(error.message);

      data.transaction_amount = data.amount

      let client;
      client = await Client.findOne({ where: { email: data.client.email } });
      if (client === null) {
        client = await Client.create(data.client)
      }
      data.client_id = client.dataValues.client_id

      const currency = await Currency.findOne({ where: { name: data.currency } });
      if (currency === null) throw new ValidationError("Invalid currency");
      data.currency_id = currency.dataValues.currency_id


      return await Transaction.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
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
      console.log(nb, clients);
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