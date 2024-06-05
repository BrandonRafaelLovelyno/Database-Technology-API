const review = require("../controller/review");

const reviewRouter = (router) => {
  router.post("/review", review.addReview);
  router.delete("/review/:id", review.deleteReview);
};

module.exports = reviewRouter;
