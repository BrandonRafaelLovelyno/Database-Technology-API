const sql = require("../helper/query.js");

const getBook = async (req, res, next) => {
  try {
    let conditions = "TRUE";

    Object.keys(req.query).forEach((key) => {
      conditions += ` AND ${key} = '${req.query[key]}'`;
    });

    const books = await sql.Select({ table: "book", conditions });
    if (books.length === 0) {
      res.status(404);
      throw new Error("No book found");
    }
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

const buyBook = async (req, res, next) => {
  try {
    const { customer_id, book_id, quantity } = req.body;
    const book = await sql.Select({
      table: "book",
      conditions: `id = ${book_id}`,
    });
    if (book.length === 0) {
      res.status(404);
      throw new Error("Book not found");
    }
    if (book[0].quantity < quantity) {
      res.status(400);
      throw new Error("Not enough book in stock");
    }
    const customer = await sql.Select({
      table: "customer",
      conditions: `id = ${customer_id}`,
    });
    if (customer.length === 0) {
      res.status(404);
      throw new Error("Customer not found");
    }
    const querys = [
      `UPDATE book SET quantity = quantity - ${quantity} WHERE id = ${book_id}`,
      `INSERT INTO book_bought (customer_id, book_id, quantity,buy_date) VALUES (${customer_id}, ${book_id}, ${quantity},NOW())`,
    ];
    await sql.Transaction(querys);
    const book_bought = await sql.Select({
      table: "book_bought",
      conditions: `customer_id = ${customer_id} AND book_id = ${book_id}`,
    });
    res.json(book_bought);
  } catch (err) {
    next(err);
  }
};

const insertBook = async (req, res, next) => {
  try {
    const { book, author_id, category_id } = req.body;
    const author = await sql.Select({
      table: "author",
      conditions: `id = ${author_id}`,
    });
    if (author.length === 0) {
      res.status(404);
      throw new Error("Author not found");
    }
    const category = await sql.Select({
      table: "category",
      conditions: `id = ${category_id}`,
    });
    if (category.length === 0) {
      res.status(404);
      throw new Error("Category not found");
    }
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

    let select_conditions = "TRUE";

    Object.keys(book).forEach((key) => {
      select_conditions += ` AND ${key} = '${book[key]}'`;
    });

    const insertedBook = await sql.Select({
      table: "book",
      conditions: select_conditions,
    });

    res.status(201).json(insertedBook);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBook,
  buyBook,
  insertBook,
};
