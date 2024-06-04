const { query } = require("../db/index.js");

const Select = ({ table, conditions }) =>
  new Promise((resolve, reject) => {
    query(`SELECT * FROM ${table} WHERE ${conditions}`, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.rows);
    });
  });

module.exports = {
  Select,
};
