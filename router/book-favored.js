const bookFavored = require("../controller/book-favored");

const bookFavoredRouter = (router) => {
  router.post("/book-favored", bookFavored.favorBook);
  router.delete("/book-favored", bookFavored.unfavorBook);
};

module.exports = bookFavoredRouter;
