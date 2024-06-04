const express = require("express");

const router = express.Router();

const bookRouter = require("./book");

module.exports = () => {
  bookRouter(router);
  return router;
};
