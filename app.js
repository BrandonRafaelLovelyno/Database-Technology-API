const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Good Reading Bookstore",
  password: "pribadi80",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
