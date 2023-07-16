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
            try {
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

        },

        
        
        postPSP: async (req, res, next) => {
            await fetch(`${process.env.PSP_URL}/psp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            })
                .then(async response => {
                    console.log(await response.text());
                    if (!response.ok) {
                        res.status(422).json({ urlFailed: req.user.redirectUrlCancellation });
                    } else {
                        res.json({ confirmationUrl: req.user.redirectUrlConfirmation });
                    }
                })
                .catch(error => {
                    console.error('Error sending payment response:', error.message);
                });
        },
    };
};