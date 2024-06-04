const book = require("../controller/book");

const bookRouter = (router) => {
  router.get("/book", book.getBook);
};

module.exports = bookRouter;
