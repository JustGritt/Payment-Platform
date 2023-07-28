const { Router } = require("express");
const ValidationError = require("../errors/ValidationError");
const Joi = require("joi");

module.exports = function ( merchantService, contactService) {
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
      if (!merchant.is_active) {
        return res.sendStatus(401);
      }
      return res.json({ user: merchant, token });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: (err.errors && typeof err.errors === 'string') ? err.errors : (err.error?.details && Array.isArray(err.error.details)) ? err.errors.details[0].message : err.message });
    }
  });

  router.post("/admin404", async function (req, res) {
    const { email, password } = req.body;

    try {
      const loginValidation = Joi.object({
        email: Joi.string().email().required().messages({ "*": "Email is required" }),
        password: Joi.string().required().messages({ "*": "Password is required" }),
      })
      const { error } = loginValidation.validate(req.body)
      if (error) throw new ValidationError(error);
      const userService = require("../services/user");
      const [user] = await userService.findAll({ email });
      console.log(user)
      if (!user) {
        return res.sendStatus(401);
      }
      if (!user.checkPassword(password)) {
        return res.sendStatus(401);
      }

      //send the all user exept the password to the front
      user.password = undefined;
    
      const userWithRole = { ...user.toJSON(), role: "admin" };
      return res.json({ user: userWithRole, token: user.generateToken() });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: (err.errors && typeof err.errors === 'string') ? err.errors : (err.error?.details && Array.isArray(err.error.details)) ? err.errors.details[0].message : err.message });
    }
  });

  router.post("/register", async function (req, res) {
    try {
      const { sendMail } = require("../libs/email");
      console.log(req.body)
      // Récupérer les données du formulaire d'inscription du marchand depuis le corps de la requête

      // Créer un nouvel enregistrement pour le marchand dans la base de données
      const newMerchant = await merchantService.create(req.body.merchantData);
      await contactService.create({...req.body.contactData, merchant_id: newMerchant.merchant_id});

      sendMail(
        req.body.merchantData.email,
        "Confirmation de votre demande d'inscription",
        "Merci pour votre inscription. Un de nos conseillers va étudier et confirmer votre demande d'inscription.",
        "Merci pour votre inscription. Un de nos conseillers va étudier et confirmer votre demande d'inscription."
      );

      // Répondre avec le nouveau marchand créé
      res.status(201).json(newMerchant);
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      res.status(500).json({
        error: "Une erreur est survenue lors de l'enregistrement du marchand.",
      });
    }
  });

  return router;
};