const express = require("express");

const router = express.Router();

const bookRouter = require("./book");
const favoredBookRouter = require("./book-favored");
const reviewRouter = require("./review");

module.exports = () => {
  bookRouter(router);
  favoredBookRouter(router);
  reviewRouter(router);
  return router;
};
