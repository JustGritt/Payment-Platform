const { Sequelize } = require("sequelize");
const { Merchant } = require("../db"); // Assuming the Merchant model is defined in "../db"
const ValidationError = require("../errors/ValidationError");

module.exports = {
  findAll: async function (criteria, options = {}) {
    return Merchant.findAll({
      where: criteria,
      ...options,
      order: Object.entries(options.order || []),
    });
  },
  findById: async function (id) {
    return Merchant.findByPk(id);
  },
  login: async function (data) {
    try {
      const merchant = await Merchant.findOne({ where: { email: data.email } });
      if (!merchant) throw new ValidationError("Invalid email or password");
      if (!merchant.checkPassword(data.password)) throw new ValidationError("Invalid email or password");
      return { merchant, token: user.generateToken() };
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        throw ValidationError.createFromSequelizeValidationError(e);
      }
      throw e;
    }
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
      const [nb, Merchants = []] = await Merchant.update(data, {
        where: criteria,
        returning: true,
        individualHooks: true,
      });
      console.log(nb, Merchants);
      return Merchants;
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