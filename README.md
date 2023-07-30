# Payment-Platform

## First you need to build
`docker compose up -d`

Note: the docker compose has a database, the front and back of the BackOffice.

## Play the migration

`docker compose exec node-api npm run seed`

## Writing some test Using Jest and Supertest 

Running the tests doesn't need the server to be UP, The test environment is self-contained, it provides test database that will be erased itself at the end of all tests.

```
const supertest = require('supertest');
const { app } = require('./testGlobalSetup');

/*  add additional import for the test purpose */

describe('I test Something', () => {
  const testApp = supertest(app);
   it('do something', async () => {
      const response = await testApp.get(`/someRoute`);
      expect(response.status).toBe(200);
   }
}

```

## Add Jwt verification on one specific route

The authentificationGuard verify if there a berear token and check if the token is valid or not. You can see the full implementation [here](https://github.com/JustGritt/Payment-Platform/blob/main/payment/api/middlewares/authentificationGuard.js)

```
app.get("/health", authentificationGuard, (req, res) => {
  res.sendStatus(200);
});
```
## Running test

```
# Go to the front folder (Assuming you are in the root folder of the project)
cd payment/api

# Run the test
npm run test
```

## Running End-to-End test

The end-to-end test is a test that will run the server and the database and will test the API from the front to the database. The test will be run on a different database than the one used for the development. The test database will be erased at the end of the test.

```
# You first have to build the docker compose
docker compose up -d --build

# Go to the front folder (Assuming you are in the root folder of the project)
cd payment/front

# Run the test
npm run test:e2e
```

