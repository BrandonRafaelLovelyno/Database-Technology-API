const sql = require("../helper/query.js");

const favorBook = async (req, res, next) => {
  try {
    const { account_id, book_id } = req.body;
    const value = `(${account_id}, ${book_id})`;
    const bookFavored = await sql.Insert({
      table: "book_favored",
      value,
      attribute: "(account_id, book_id)",
    });
    res.status(201).json(bookFavored);
  } catch (err) {
    next(err);
  }
};

const unfavorBook = async (req, res, next) => {
  try {
    const { account_id, book_id } = req.body;
    const conditions = `account_id=${account_id} AND book_id=${book_id}`;
    const bookFavored = await sql.Delete({ table: "book_favored", conditions });
    res.status(200).json(bookFavored);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  favorBook,
  unfavorBook,
};
