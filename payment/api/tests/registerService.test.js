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

    try {
      // Send the POST request to /register
      const response = await testApp.post('/register').send({
        merchant: merchantData,
        contact: sampleContactData,
      });

      // Assertions for the response
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      // Add more assertions for other expected properties in the response

      // Check if the merchant and contact were created in the database
      const createdMerchant = await merchantService.findByPk(response.body.id, { include: [Contact] });
      expect(createdMerchant).toBeDefined();
      expect(createdMerchant.name).toBe(merchantData.name);

      const createdContact = await contactService.findAll({firstname: sampleContactData.firstname})
      expect(createdContact).toBeDefined();
      expect(createdContact.firstname).toBe(sampleContactData.firstname);
      // Add more assertions for other expected contact properties

    } catch (error) {
      console.error('Error during registration test:', error);
    }
  });

  // Add more tests for error cases or additional scenarios if needed
});
