'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminUser = {
      lastname: 'Admin',
      firstname: 'User',
      email: 'admin@example.com',
      password: 'adminpassword', // You should hash this password before inserting it into the database.
    };

    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(adminUser.password, salt);
    adminUser.password = hash;
    adminUser.createdAt = new Date();

    // Insert the admin user into the "users" table.
    await queryInterface.bulkInsert('users', [adminUser], {});

    console.log('Admin user created successfully');

  },

  async down(queryInterface, Sequelize) {
    // Delete the admin user from the "users" table.
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});

    console.log('Admin user deleted successfully');
  }
};
