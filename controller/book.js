const sql = require("../helper/query.js");

const getBook = async (req, res, next) => {
  let conditions = "TRUE";

  Object.keys(req.query).forEach((key) => {
    conditions += `${key} = 'AND ${req.query[key]} '`;
  });

  const books = await sql.Select({ table: "boo", conditions });
  res.json(books);
};

module.exports = {
  getBook,
};
