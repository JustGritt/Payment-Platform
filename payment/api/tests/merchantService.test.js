/*
const supertest = require('supertest');
const { app } = require('./testGlobalSetup');
const merchantService = require('../services/Merchant');
const { Merchant } = require("../db/models/Merchant"); 

describe('Merchant Service Tests', () => {
  const testApp = supertest(app);

  // Mock data for testing
  const mockMerchantData = {
    name: 'Test Merchant',
    email: 'test@test.com',
    password: 'testpassword',
  };

  // Clean up the database after each test
  afterEach(async () => {
    await Merchant.destroy({ where: {} });
  });

  it('should create a new merchant', async () => {
    const response = await testApp.post('/create-merchant').send(mockMerchantData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(mockMerchantData.name);
    expect(response.body.email).toBe(mockMerchantData.email);
    // Add more assertions if needed
  });

  it('should return all merchants', async () => {
    // Create some mock merchants in the database
    const merchant1 = await Merchant.create(mockMerchantData);
    const merchant2 = await Merchant.create({
      name: 'Test Merchant 2',
      email: 'test2@test.com',
      password: 'testpassword2',
    });

    const response = await testApp.get('/get-all-merchants');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Assuming we have 2 mock merchants in the response
    // Add more assertions if needed
  });

  it('should update a merchant', async () => {
    // Create a mock merchant in the database
    const merchant = await Merchant.create(mockMerchantData);

    const updatedData = {
      name: 'Updated Merchant',
      email: 'updated@test.com',
    };

    const response = await testApp.put(`/update-merchant/${merchant.id}`).send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', merchant.id);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.email).toBe(updatedData.email);
    // Add more assertions if needed
  });

  it('should delete a merchant', async () => {
    // Create a mock merchant in the database
    const merchant = await Merchant.create(mockMerchantData);

    const response = await testApp.delete(`/delete-merchant/${merchant.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Merchant deleted successfully' });
    // Add more assertions if needed
  });

  // Add more tests for other functions in the merchantService if needed
});
*/
