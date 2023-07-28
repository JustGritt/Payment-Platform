const ValidationError = require("../errors/ValidationError");
const { Operation } = require("../db");
const Joi = require('joi');


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
        getAll: async (req, res, next) => {
            try {
                if(req.user.role === "admin") {
                   const operations = await Service.findAll();
                   res.json(operations);
                }
                else {
                   const transactionService = require('../services/transaction');
                   const transactions = await transactionService.findAll({merchant_id: req.user.id});
                   const transactionMerchantIds = transactions.map((transaction) => transaction.transaction_id);
                   const operations = await Service.findAll();
                   const operationTransactions = operations.map((operation) => operation.transaction_id);
                   const operationsFiltered = operationTransactions.filter((operationTransaction) => transactionMerchantIds.includes(operationTransaction));
                   const operationsFiltered2 = operations.filter((operation) => operationsFiltered.includes(operation.transaction_id));
                   res.json(operationsFiltered2);
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