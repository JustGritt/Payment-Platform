const { Router } = require("express");
module.exports = function () {
    const router = Router();

    const postPSP = async (req, res, next) => {
        //TODO: update the operation status in db
        //TODO: update the transaction status in db
        //TODO: go find in db the transaction id and send it back to the client
        //TODO: go find in db the merchant webhook url and send it back to the client
        const MERCHANT_URL = 'http://localhost:3000/psp/merchant/webhook';
        fetch(MERCHANT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send payment response');
                }
                console.log('Payment response sent successfully');
            }
            )
            .catch(error => {
                console.error('Error sending payment response:', error.message);
            });
        console.log(req.body);
        res.sendStatus(200);
    }

    router.post("/psp", postPSP);
    return router;
};