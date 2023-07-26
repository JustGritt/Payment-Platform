const { Router } = require("express");

module.exports = function (userService, merchantService, contactService) {
  const router = Router();

  router.post("/login", async function (req, res) {
    const { email, password } = req.body;
    const [user] = await userService.findAll({ email });
    if (!user) {
      return res.sendStatus(401);
    }
    if (!user.checkPassword(password)) {
      return res.sendStatus(401);
    }

    res.json({ token: user.generateToken() });
  });

  router.post("/register", async function (req, res) {
    try {
      console.log(req.body)
      // Récupérer les données du formulaire d'inscription du marchand depuis le corps de la requête

      // Créer un nouvel enregistrement pour le marchand dans la base de données
      const newMerchant = await merchantService.create(req.body.merchantData);

      const newContact = await contactService.create({...req.body.contactData, merchant_idmerchant: newMerchant.id});
      console.log(newContact)

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
