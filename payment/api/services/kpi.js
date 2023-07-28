const { getDb } = require('../db/mongoConnection');

const getMerchantTotalOrders = async (merchantId) => {
    const db = getDb();
    const collection = db.collection('transactions');

    const totalOrders = await collection.countDocuments({ merchant_id: Number(merchantId) });

    return totalOrders;
};

const getMerchantAverageOrderValue = async (merchantId) => {
    const db = getDb();
    const collection = db.collection('transactions');

    const result = await collection.aggregate([
        { $match: { merchant_id: Number(merchantId) } },
        {
            $group: {
                _id: null,
                avgAmount: { $avg: "$transaction_history.transaction_amount" }
            }
        }
    ]).toArray();

    return result[0]?.avgAmount || 0; // Retourne la valeur moyenne ou 0 si aucun résultat
};

module.exports = {
    getMerchantTotalOrders,
    getMerchantAverageOrderValue
};
