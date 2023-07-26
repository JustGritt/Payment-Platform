require("dotenv").config();
const { connection } = require("./db");

connection.sync({alter: true}).then(() => {
  console.log("Database synchronized");
  connection.close();
});
