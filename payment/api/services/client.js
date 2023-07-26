const { Sequelize } = require("sequelize");
const { Client } = require("../db"); // Assuming the Client model is defined in "../db"
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Client.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || []),
    });
  },
  findById: async function (id) {
    return Client.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Client.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, clients = []] = await Client.update(data, {
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
    return Client.destroy({
      where: criteria,
    });
  },
};