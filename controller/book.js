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

const insertBook = async (req, res, next) => {
  try {
    const { book, author_id, category_id } = req.body;
    const book_query = {
      attribute: "(",
      value: "(",
    };

    Object.keys(book).forEach((key) => {
      book_query.attribute += `${key}, `;
      book_query.value += `'${book[key]}', `;
    });

    book_query.attribute = book_query.attribute.slice(0, -2) + ")";
    book_query.value = book_query.value.slice(0, -2) + ")";

    const queries = [
      `INSERT INTO book ${book_query.attribute} VALUES ${book_query.value}`,
      `INSERT INTO book_written (book_id, author_id) VALUES (currval('book_id_seq'), ${author_id})`,
      `INSERT INTO book_categorized (book_id, category_id) VALUES (currval('book_id_seq'), ${category_id})`,
    ];

    await sql.Transaction(queries);

    res.status(201).send("Book added");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBook,
  buyBook,
  insertBook,
};
