const supertest = require('supertest');
const { app } = require('./testGlobalSetup');
const merchantService = require('../services/merchant');
const contactService = require('../services/contact');
const { UUIDV4 } = require('sequelize')

jest.mock('postmark');

describe('Register Endpoint Tests', () => {
  const testApp = supertest(app);


  it('should register a new user (merchant) with contact', async () => {
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

    
    // Send the POST request to /register
    const response = await testApp.post('/register').send({
      merchantData: merchantData,
      contactData: sampleContactData,
    });

    // Assertions for the response
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('email');
    // Add more assertions for other expected properties in the response body
    });

  });

