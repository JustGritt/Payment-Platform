const { Router } = require("express");
const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

module.exports = function (merchantService) {
  const router = Router();

  router.post("/login", async function (req, res) {
    const { email, password } = req.body;
    try {
      const loginValidation = Joi.object({
        email: Joi.string().email().required().messages({ "*": "Email is required" }),
        password: Joi.string().required().messages({ "*": "Password is required" }),
      })
      const { error } = loginValidation.validate(req.body)
      if (error) throw new ValidationError(error);
      const { merchant, token } = await merchantService.login({ email, password });
      return res.json({ user: merchant, token });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: (err.errors && typeof err.errors === 'string') ? err.errors : (err.error.details && Array.isArray(err.error.details)) ? err.errors.details[0].message : err.message });
    }
  });

  return router;
};