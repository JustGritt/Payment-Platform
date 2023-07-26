module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database:  process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: 5432,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: 5432,
    dialect: 'postgres',
  }
};
