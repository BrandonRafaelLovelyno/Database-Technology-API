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

const Update = ({ table, conditions, value }) =>
  new Promise((resolve, reject) => {
    query(
      `UPDATE ${table} SET ${value} WHERE ${conditions} RETURNING *`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows[0]);
      }
    );
  });

const Insert = ({ table, attribute, value }) =>
  new Promise((resolve, reject) => {
    query(
      `INSERT INTO ${table} ${attribute} VALUES ${value} RETURNING *`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows[0]);
      }
    );
  });

const Delete = ({ table, conditions }) =>
  new Promise((resolve, reject) => {
    query(
      `DELETE FROM ${table} WHERE ${conditions} RETURNING *`,
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows[0]);
      }
    );
  });

module.exports = {
  Select,
  Update,
  Insert,
  Delete,
};
