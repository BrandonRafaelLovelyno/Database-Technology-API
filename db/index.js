const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: "localhost",
  database: "Good Reading Bookstore",
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  pool,
};
