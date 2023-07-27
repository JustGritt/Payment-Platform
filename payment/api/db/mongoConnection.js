const { MongoClient } = require('mongodb');

const url = 'mongodb://root:root_password@localhost:27017';
const client = new MongoClient(url);

let mongoDb;

async function connect() {
    await client.connect();
    mongoDb = client.db('Global'); // database name
}

function getDb() {
    return mongoDb;
}

module.exports = { connect, getDb };
