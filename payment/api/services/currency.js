const { Sequelize } = require("sequelize");
const { Currency } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Currency.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return Currency.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Currency.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, Currencys = []] = await Currency.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      console.log(nb, Currencys);
      return Currencys;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Currency.destroy({
      where: criteria,
    });
  },
};