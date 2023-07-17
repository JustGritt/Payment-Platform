const supertest = require('supertest');
const { app } = require('./testGlobalSetup');
const userService  = require('../services/user');

describe('User API', () => {
  const testApp = supertest(app);
  describe('GET /users', () => {
    it('should retrieve all users', async () => {
      const response = await testApp.get('/users') //myTestApp(testApp.get('/users'));
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe('GET /users/:id', () => {
    it('should retrieve a user by id', async () => {
      // Create a test user
      const user = await userService.create({
        email: 'test@example.com', 
        firstname: 'User 1', 
        lastname: 'User 1',
        password: '123456',
      });

      const response = await testApp.get(`/users/${user.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ id: user.id }));
    });

    it('should return 404 if user with the specified id is not found', async () => {
      const response = await testApp.get('/user/123');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = { 
        email: 'test1@example.com', 
        firstname: 'User 2', 
        lastname: 'User 2',
        password: '123456', 
      };

      const response = await testApp.post('/users').send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({ email: userData.email }));
    });

    it('should return 422 if user data is invalid', async () => {
      const invalidUserData = { email: 'invalid_email@gmail.com' };

      const response = await testApp.post('/users').send(invalidUserData);

      expect(response.status).toBe(400);
    });
  });

  /*
  describe('PUT /users/:id', () => {
    it('should update a user by id', async () => {
      // Create a test user
      const user = await User.create({ 
        email: 'test3@example.com', 
        firstname: 'User 3', 
        lastname: 'User 3',
        password: '123456',  
      });

      const updatedData = { firstname: 'Updated User' };

      const response = await testApp.put(`/users/${user.id}`).send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(updatedData));
    });

    it('should return 404 if user with the specified id is not found', async () => {
      const invalidId = 123;

      const response = await testApp.put(`/users/${invalidId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by id', async () => {
      // Create a test user
      const user = await User.create({ 
        email: 'test4@example.com', 
        firstname: 'User 4', 
        lastname: 'User 4',
        password: '123456',  
      });

      const response = await testApp.delete(`/users/${user.id}`);

      expect(response.status).toBe(204);

      // Verify that the user is deleted from the database
      const deletedUser = await User.findOne({ where: { id: user.id } });
      expect(deletedUser).toBeNull();
    });

    it('should return 404 if user with the specified id is not found', async () => {
      const invalidId = 123;

      const response = await testApp.delete(`/users/${invalidId}`);

      expect(response.status).toBe(404);
    });
  });
  */
});
