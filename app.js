const express = require("express");
const morgan = require("morgan");
const { pool } = require("./db");

const app = express();
const port = 3000;

const errorHandler = require("./middleware/errorHandler");
const router = require("./router");
const bodyParser = require("body-parser");

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/", router());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  close: () => {
    return pool.end();
  },
};
