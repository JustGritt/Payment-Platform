const ValidationError = require("../errors/ValidationError");
const { Operation, TransactionState } = require("../db");
const Joi = require('joi');
const kpiService = require('../services/kpi');

module.exports = function (Service) {
    return {
        post: async (req, res, next) => {
            try {
                const service = await Service.create(req.body, req.user);
                res.status(201).json(service);
            } catch (err) {
                next(err);
            }
        },
        get: async (req, res, next) => {
            try {
                const user = await Service.findById(parseInt(req.params.id));
                if (!user) return res.sendStatus(404);
                res.json(user);
            } catch (err) {
                next(err);
            }
        },
        getKPIsForMerchant: async (req, res, next) => {
            try {
                const merchantId = req.params.merchantId;
                const totalOrders = await kpiService.getMerchantTotalOrders(merchantId);
                const averageOrderValue = await kpiService.getMerchantAverageOrderValue(merchantId);

                res.json({
                    totalOrders,
                    averageOrderValue
                });
            } catch (err) {
                next(err);
            }
        },

        getTransactionByTransactionId: async (req, res, next) => {
            console.log("req.params", req.params)
            try {
                console.log("req.params", req.params.transactionId)

                const transactionId = req.params.transactionId; // Supposons que l'ID de transaction est passé comme un paramètre dans l'URL
                const transaction = await Service.searchByTransactionId(transactionId);

                if (!transaction) {
                    return res.status(404).json({ message: 'Transaction not found' });
                }

                res.json(transaction);
            } catch (err) {
                next(err);
            }
        },
        getAll: async (req, res, next) => {
            console.log(req.user)
            try {
                if(req.user.role === "admin") {
                    const contactService = require("../services/contact");

                    const transactions = await Service.findAll();
                    const merchantIds = transactions.map((transaction) => transaction.merchant_id);

                    // Fetch all contacts for the corresponding merchant_ids
                    const contactsPromises = merchantIds.map((id) => contactService.findAll({ merchant_id: id }));
                    const contactsArrays = await Promise.all(contactsPromises);

                    const foundContacts = [];
                    contactsArrays.forEach((contactArray, index) => {
                        const contact = contactArray[0]; // Assuming you want to consider only the first contact
                        if (contact && merchantIds[index] === contact.merchant_id) {
                            foundContacts.push(contact);
                        }
                    });

                    transactions.forEach((transaction, index) => {
                        const foundContact = foundContacts[index];
                        if (foundContact && merchantIds[index] === foundContact.merchant_id) {
                        transaction.merchant_id = foundContact.firstname; // Assuming "firstname" is the property you want to use
                        }
                    });

                    res.json(transactions);
                }
                else {
                    const clientService = require("../services/client");
                    const transactions = await Service.findAll({ merchant_id: req.user.id });
                    const clientIds = transactions.map((transaction) => transaction.client_id);

                    // Fetch all clients for the corresponding client_ids
                    const clientsPromises = clientIds.map((id) => clientService.findAll({ client_id: id }));
                    const clientsArrays = await Promise.all(clientsPromises);

                    const foundClients = [];
                    clientsArrays.forEach((clientArray, index) => {
                        const client = clientArray[0]; // Assuming you want to consider only one client
                        if (client && clientIds[index] === client.client_id) {
                            foundClients.push(client);
                        }
                    });

                    transactions.forEach((transaction, index) => {
                        const foundClient = foundClients[index];
                        console.log(foundClient);
                        if (foundClient && clientIds[index] === foundClient.client_id) {
                            transaction.client_id = foundClient; // Assuming "email" is the property you want to use
                        }
                    });
                    res.json(transactions);

                }
            } catch (err) {
                next(err);
            }
        },
        cancel: async (req, res, next) => {
            try {
                const transaction_state = await TransactionState.findOne({
                    where: {
                        name: "cancelled",
                    }
                });
                const service = await Service.update({ transaction_id: parseInt(req.params.id) }, { transaction_state: transaction_state.dataValues.transaction_id });
                res.status(201).json(service);
            } catch (err) {
                next(err);
            }
        },

        postPSP: async (req, res, next) => {
            function maskCard(num) {
                return `${num.substr(0, 4)}${'*'.repeat(num.length - 8)}${num.substr(num.length - 4)}`;
            }

            try {
                const shemaValidation = Joi.object({
                    amount: Joi.number().required(),
                    email: Joi.string().email().required(),
                    name: Joi.string().required(),
                    region: Joi.string().required(),
                    adress: Joi.string().required(),
                    type_payment: Joi.string().required(),
                    cardNumber: Joi.object({
                        card_number: Joi.string().required(),
                        cvc: Joi.number().required(),
                        expiry: Joi.string().required(),
                    }).required(),
                })
                const { error } = shemaValidation.validate(req.body)
                if (error) throw new ValidationError(error.message);

                const operation = await Operation.create({
                    transaction_id: req.params.id,
                    amount: req.body.amount,
                    card_number: maskCard((req.body.cardNumber.card_number).replace(/\s/g, "")),
                    card_expiry_date: (req.body.cardNumber.expiry).replace(/\s/g, ""),
                })

                await fetch(`${process.env.PSP_URL}/psp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req.body)
                })
                    .then(async response => {
                        if (!response.ok) {
                            return res.status(422).json({ urlFailed: req.user.redirectUrlCancellation });
                        } else {
                            const service = await Service.pay({ ...{ clientData: req.body }, id: req.params.id, operation_id: operation.dataValues.operation_id });
                            return res.json({ confirmationUrl: req.user.redirectUrlConfirmation });
                        }
                    })
                    .catch(error => {
                        console.error('Error sending payment response:', error.message);
                    });
            } catch (error) {
                next(error);
            }
        },
    };
};