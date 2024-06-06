const sql = require("../helper/query.js");

const addReview = async (req, res, next) => {
  try {
    const { account_id, book_id, rating, comment } = req.body;
    const account = await sql.Select({
      table: "account",
      conditions: `id = ${account_id}`,
    });
    if (account.length === 0) {
      res.status(404);
      throw new Error("Account not found");
    }
    const book = await sql.Select({
      table: "book",
      conditions: `id = ${book_id}`,
    });
    if (book.length === 0) {
      res.status(404);
      throw new Error("Book not found");
    }
    if (rating < 1 || rating > 5) {
      res.status(400);
      throw new Error("Rating must be between 1 and 5");
    }
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
    const review = await sql.Select({
      table: "review",
      conditions: `id = ${id}`,
    });
    if (review.length === 0) {
      res.status(404);
      throw new Error("Review not found");
    }
    const deleted_review = await sql.Delete({
      table: "review",
      conditions: `id = ${id}`,
    });
    res.status(200).json(deleted_review);
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
