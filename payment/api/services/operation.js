const { Sequelize } = require("sequelize");
const { Operation } = require("../db"); // Assuming the Operation model is defined in "../db"
const valid = require("card-validator");
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
    function checkCardNumber(value) {
      const numberValidation = valid.number(value);
      return numberValidation.isValid
    }

    function maskCard(num) {
      return `${num.substr(0, 4)}${'*'.repeat(num.length - 8)}${num.substr(num.length - 4)}`;
    }

    try {
      if (!data.card_number)
        throw new ValidationError("You have to provide a valid card number");
      if (!data.card_expiry_date)
        throw new ValidationError("You have to provide a valid card expiry date");
      if (!checkCardNumber(data.card_number))
        throw new ValidationError("Invalid card number");
      data.card_number = maskCard(data.card_number)
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