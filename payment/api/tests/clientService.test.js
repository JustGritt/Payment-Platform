const supertest = require('supertest');
const { app } = require('./testGlobalSetup');
const clientService = require('../services/client');

describe('Client API', () => {
    const testApp = supertest(app);

    // Clean up the database after all tests are finished
    afterAll(async () => {
        // Add your database cleanup logic here, for example, delete all clients created during the tests
    });

    describe('GET /clients', () => {
        // ... Your existing test for retrieving all clients
    });

    describe('GET /clients/:id', () => {
        // ... Your existing tests for getting a client by ID
    });

    describe('POST /clients', () => {
        // ... Your existing tests for creating a new client

        it('should return 422 if client data is incomplete', async () => {
            const incompleteClientData = {
                email: 'test@example.com',
                // Missing firstname and lastname
                creditCard: '1234567890123456',
            };

            const response = await testApp.post('/clients').send(incompleteClientData);

            expect(response.status).toBe(422);
        });
    });

    describe('DELETE /clients/:id', () => {
        // ... Your existing tests for deleting a client

        it('should return 404 if client with the specified id does not exist', async () => {
            const nonExistingClientId = 999999; // Use a non-existing client ID

            const response = await testApp.delete(`/clients/${nonExistingClientId}`);

            expect(response.status).toBe(404);
        });
    });
});
