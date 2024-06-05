const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Good Reading Bookstore",
  password: "pribadi80",
  port: 5433,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  pool,
};
