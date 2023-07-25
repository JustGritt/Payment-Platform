const { Router } = require("express");

module.exports = function (userService, merchantService) {
  const router = Router();

  router.post("/login", async function (req, res) {
    const { email, password } = req.body;
    const [user] = await merchantService.findAll({ email });
    console.log(user)
    if (!user) {
      return res.sendStatus(401);
    }
    if (!user.checkPassword(password)) {
      return res.sendStatus(401);
    }

    if (user.isvalid == 0) {
      return res.sendStatus(401);
    }

    res.json({ token: user.generateToken() });
  });

  router.post("/register", async function (req, res) {
    try {
      console.log(req.body)
      // Récupérer les données du formulaire d'inscription du marchand depuis le corps de la requête
      const { merchantData, contactData } = req.body;

      // Créer un nouvel enregistrement pour le marchand dans la base de données
      const newMerchant = await merchantService.create({
        name: merchantData.name,
        kbis: merchantData.kbis,
        email: merchantData.email,
        redirectUrlConfirmation: merchantData.redirectUrlConfirmation,
        redirectUrlCancellation: merchantData.redirectUrlCancellation,
        password: merchantData.password,
        isvalid: 0, // Le marchand n'est pas encore validé
      });

      const contactService = require("../services/contact")
      const newContact = await contactService.create({
        firstname: contactData.firstname,
        phone: contactData.phone,
        address: contactData.address,
        postal_code: contactData.postal_code,
        city: contactData.city,
        lastname: contactData.lastname,
        title: contactData.title,
        email: contactData.email,
      });
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
