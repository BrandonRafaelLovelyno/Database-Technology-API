const sql = require("../helper/query.js");

const addReview = async (req, res, next) => {
  try {
    const { account_id, book_id, rating, comment } = req.body;
    const value = `(${account_id}, ${book_id}, ${rating}, '${comment}', NOW())`;
    const review = await sql.Insert({
      table: "review",
      value,
      attribute: "(account_id, book_id, rating, comment, review_date)",
    });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await sql.Delete({
      table: "review",
      conditions: `id = ${id}`,
    });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

const editReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const review = await sql.Update({
      table: "review",
      conditions: `id = ${id}`,
      value: `comment = '${comment}'`,
    });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addReview,
  deleteReview,
  editReview,
};
