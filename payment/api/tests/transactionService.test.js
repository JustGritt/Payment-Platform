const supertest = require('supertest');
const { app } = require('./testGlobalSetup');
const merchantService = require('../services/merchant');
const transactionService = require('../services/transaction');
const contactService = require('../services/contact');
const currencyService = require('../services/currency');
const { UUIDV4 } = require('sequelize');
const transactionStateService = require('../services/transactionState');
const operationService = require('../services/operation');

describe('Make transaction', () => {
  const testApp = supertest(app);
  let jwtToken = null;
  let createdCurrency = null;
  let createdMerchant = null;

  beforeAll(async () => {
    // Mock data for registration
    const merchantData = {
      name: "Sample Merchant",
      email: "sample@example.com",
      password: "samplepassword",
      kbis: "sample-kbis-path.jpg",
      phone: "1234567890",
      address: "Sample Address",
      postal_code: "12345",
      city: "Sample City",
      redirectUrlConfirmation: "http://example.com/confirmation",
      redirectUrlCancellation: "http://example.com/cancellation",
      isvalid: true,
      currency_id: 1, // Assuming currency_id is a valid currency ID in the associated Currency model
      is_active: true,
      client_token: UUIDV4(), // Generate a new UUID for the client_token
      client_secret: UUIDV4(), // Generate a new UUID for the client_secret
    };

    const sampleContactData = {
      firstname: 'John',
      lastname: 'Doe',
      title: 'Manager',
      email: 'john.doe@example.com',
    };

    createdMerchant = await merchantService.create(merchantData);
    const createdContact = await contactService.create(sampleContactData);

    const sampleCurrencyData = {
      name: 'Euro',
    };

    createdCurrency = await currencyService.create(sampleCurrencyData);
    console.log(createdCurrency);


    const sampleTransactionStateData = {
      name: 'completed',
    };


    //const createdTransactionState = await transactionStateService.create(sampleTransactionStateData);
     

    // Send the POST request to /register to obtain the token
    const loginResponse = await testApp.post('/login').send({
      email: merchantData.email,
      password: merchantData.password,
    });

    // Assertions for the response
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');

    // Save the obtained token for use in subsequent tests
    jwtToken = loginResponse.body.token;

  });

  it('should create a new transaction', async () => {

    const sampleTransactionData = {
      currency: createdCurrency.name,
      amount: 100.0,
    };

    const user = {
      merchant_id: 1,
    };


    const transaction = await transactionService.create(sampleTransactionData, user);


    expect(transaction).toHaveProperty('transaction_id');
    expect(transaction).toHaveProperty('transaction_amount')

    
      
  });
});
