const { Pool, Client } = require("pg");
const { host } = require("pg/lib/defaults");
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_POSGRES_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
