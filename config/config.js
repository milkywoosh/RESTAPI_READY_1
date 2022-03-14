// import dotenv from 'dotenv';

require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT
  },
  production: {
    username: 'root',
    password: 'null',
    database: 'database_production',
    host: 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT
  }
}
