const sql = require("../helper/query.js");

const addReview = async (req, res, next) => {
  try {
    const { account_id, book_id, rating, comment } = req.body;
    const value = `(${account_id}, ${book_id}, ${rating}, '${comment}', NOW())`;
    await sql.Insert({
      table: "review",
      value,
      attribute: "(account_id, book_id, rating, comment, review_date)",
    });
    res.status(201).send("Review added");
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    await sql.Delete({ table: "review", conditions: `id = ${id}` });
    res.status(200).send("Review deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addReview,
  deleteReview,
};
