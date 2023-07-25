const { connection } = require('../db');
const { database } = require('./testConfig');
const app = require('../server');
const fs = require('fs');

const port = 4000; // Specify the desired port for the test environment

beforeAll(async () => {
  await connection.sync({ force: true });
});

afterAll(async () => {
  await connection.close();
});

// Delete the test database after all tests have run
afterAll((done) => {
  fs.unlink(database, (err) => {
    if (err) {
      console.error(err.message);
    }
    done();
  });
});

module.exports = {
  app,
  port,
};
