const { MongoClient } = require('mongodb');


let client;
if (process.env.NODE_ENV === "test") {
    client  = null;
    mongoDb = null;
}else {
    const url = process.env.MONGO_URL;
    client = new MongoClient(url);
    
    let mongoDb;

    async function connect() {
        await client.connect();
        mongoDb = client.db('Global'); // database name
    }

    async function createMongoIndexes() {
        const dbInstance = getDb();
        const collection = dbInstance.collection('transactions');
    
        try {
            await collection.createIndex({
                transaction_uid: "text",
                "transaction_history.transaction_state": "text",
            });
            console.log("MongoDB indexes created successfully");
        } catch (err) {
            console.error("Error creating MongoDB indexes:", err);
        }
    }
    function getDb() {
        return mongoDb;
    }

    module.exports = { connect, getDb };
}


