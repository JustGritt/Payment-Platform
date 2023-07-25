const supertest = require('supertest');
const { app } = require('./testGlobalSetup');
const transactionService = require('../services/transaction');

describe('Testing transaction services', () => {
	const testApp = supertest(app);

	describe('POST Transaction', () => {
		it('should create a new transaction', async () => {
			const transactionData = {
				client_id: 1,
				amount: 100,
				transaction_date: '2021-01-01',
			};

			const response = await testApp.post('/transactions').send(transactionData);

			expect(response.status).toBe(201);
			expect(response.body).toEqual(expect.objectContaining({
				amount: transactionData.amount
			}));
		}
	});

});