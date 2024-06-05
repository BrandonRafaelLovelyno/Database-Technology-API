const review = require("../controller/review");

const reviewRouter = (router) => {
  router.post("/review", review.addReview);
  router.delete("/review/:id", review.deleteReview);
  router.patch("/review/:id", review.editReview);
};

module.exports = reviewRouter;
