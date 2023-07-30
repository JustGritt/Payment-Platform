const { Sequelize } = require("sequelize");
const { TransactionState } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return TransactionState.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return TransactionState.findByPk(id);
  },
  create: async function (data) {
    try {
      return await TransactionState.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, TransactionStates = []] = await TransactionState.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      console.log(nb, TransactionStates);
      return TransactionStates;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return TransactionState.destroy({
      where: criteria,
    });
  },
};