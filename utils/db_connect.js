const { Pool, Client } = require("pg");
const { host } = require("pg/lib/defaults");
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_POSGRES_PASSWORD,
  port: process.env.DB_PORT,
});

const { Sequelize, Op, Model, DataTypes } = require('@sequelize/core');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_POSGRES_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

module.exports = {
  pool: pool,
  sequelize: sequelize,
};

