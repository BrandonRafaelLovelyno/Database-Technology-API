const book = require("../controller/book");

const bookRouter = (router) => {
  router.get("/book", book.getBook);
  router.post("/book/buy", book.buyBook);
  router.post("/book", book.insertBook);
};

module.exports = bookRouter;
