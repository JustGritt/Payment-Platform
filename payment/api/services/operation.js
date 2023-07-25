const { Sequelize } = require("sequelize");
const { Operation } = require("../db"); // Assuming the Operation model is defined in "../db"
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Operation.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || []),
    });
  },
  findById: async function (id) {
    return Operation.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Operation.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, clients = []] = await Operation.update(data, {
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
    return Operation.destroy({
      where: criteria,
    });
  },
};