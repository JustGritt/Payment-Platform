const fs = require("fs");
const path = require("path");
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
const { connect, getDb } = require("./mongoConnection");
let connection;
  
if (process.env.NODE_ENV === "test") {
  const { database } = require("../tests/testConfig");
  connection = new Sequelize({ dialect: "sqlite", storage: database, });
} else {
  console.log(process.env.DATABASE_URL);
  connection = new Sequelize(process.env.DATABASE_URL);
}

const db = { connection };



async function createMongoIndexes() {
  await connect()
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

createMongoIndexes(); 

fs.readdirSync(path.join(__dirname, "models")).forEach((file) => {
  const model = require(path.join(__dirname, "models", file))(connection);
  console.log(model.name, model.prototype.constructor.name);
  db[model.name] = model;
});

for(let modelName in db) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

module.exports = db;