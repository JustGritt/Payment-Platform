const { Sequelize } = require("sequelize");
const { Contact } = require("../db");
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Contact.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || {}),
    });
  },
  findById: async function (id) {
    return Contact.findByPk(id);
  },
  create: async function (data) {
    try {
      return await Contact.create(data);
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  update: async function (criteria, data) {
    try {
      const [nb, contacts = []] = await Contact.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      console.log(nb, contacts);
      return contacts;
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
  },
  remove: async function (criteria) {
    return Contact.destroy({
      where: criteria,
    });
  },
};
