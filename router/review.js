const review = require("../controller/review");

const reviewRouter = (router) => {
  router.post("/review", review.addReview);
};

module.exports = reviewRouter;
