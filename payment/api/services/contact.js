const { Contact } = require("../db");

async function createContact(data) {
  return Contact.create(data);
}

async function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

// Ajoutez d'autres fonctions de service selon vos besoins

module.exports = {
  createContact,
  getContactById,
  // Exportez d'autres fonctions ici si nécessaire
};
