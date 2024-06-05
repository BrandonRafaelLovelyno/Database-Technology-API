const sql = require("../helper/query.js");

const getBook = async (req, res, next) => {
  try {
    let conditions = "TRUE";

    Object.keys(req.query).forEach((key) => {
      conditions += `${key} = 'AND ${req.query[key]} '`;
    });

    const books = await sql.Select({ table: "boo", conditions });
    res.json(books);
  } catch (err) {
    next(err);
  }
};

const buyBook = async (req, res, next) => {
  try {
    const { customer_id, book_id, quantity } = req.body;
    const querys = [
      `UPDATE book SET quantity = quantity - ${quantity} WHERE book_id = ${book_id}`,
      `INSERT INTO book_bought (customer_id, book_id, quantity,buy_date) VALUES (${customer_id}, ${book_id}, ${quantity},NOW())`,
    ];
    await sql.Transaction(querys);
    res.json({ message: "Book bought successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBook,
  buyBook,
};
