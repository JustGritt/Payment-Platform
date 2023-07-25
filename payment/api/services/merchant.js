const { Sequelize } = require("sequelize");
const { Merchant } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Merchant.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return Merchant.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Merchant.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, merchants = []] = await Merchant.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      console.log(nb, merchants);
      return merchants;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Merchant.destroy({
      where: criteria,
    });
  },
};
