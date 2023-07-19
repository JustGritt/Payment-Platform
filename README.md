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
        expect(response.status).toBe(200);
   }
}

```
