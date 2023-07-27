const { Merchant } = require('../db/models/Merchant');
const merchantService = require('../services/merchant');

// Mock the Merchant model's create method
Merchant.create = jest.fn();

describe('Merchant Service - Register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully register a merchant', async () => {
        // Mock successful creation
        Merchant.create.mockResolvedValue({
            merchant_id: 1,
            name: 'Test Merchant',
            email: 'test@example.com',
            // ... other fields
        });

        const newMerchant = await merchantService.create({
            name: 'Test Merchant',
            email: 'test@example.com',
            // ... other fields
        });

        expect(newMerchant).toHaveProperty('merchant_id', 1);
        expect(newMerchant).toHaveProperty('name', 'Test Merchant');
        expect(newMerchant).toHaveProperty('email', 'test@example.com');
    });

    it('should handle errors during registration', async () => {
        // Mock error during creation
        Merchant.create.mockRejectedValue(new Error('Registration error'));

        await expect(merchantService.create({
            name: 'Test Merchant',
            email: 'test@example.com',
            // ... other fields
        })).rejects.toThrow('Registration error');
    });
});
