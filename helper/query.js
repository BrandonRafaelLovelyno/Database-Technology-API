const { query } = require("../db/index.js");
const { pool } = require("../db/index.js");

const Select = ({ table, conditions }) =>
  new Promise((resolve, reject) => {
    query(`SELECT * FROM ${table} WHERE ${conditions}`, (err, res) => {
      if (err) {
        reject(err);
      }
      if (!res || !res.rows) {
        reject(new Error("Something went wrong on fetching data"));
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
        if (!res || !res.rows) {
          reject(new Error("Something went wrong on updating data"));
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
        if (!res || !res.rows) {
          reject(new Error("Something went wrong on inserting data"));
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
        if (!res || !res.rows) {
          reject(new Error("Something went wrong on deleting data"));
        }
        resolve(res.rows[0]);
      }
    );
  });

const Transaction = async (queries) => {
  try {
    const client = await pool.connect();
    await client.query("BEGIN");
    queries.forEach(async (query) => {
      await client.query(query);
    });
    await client.query("COMMIT");
    client.release();
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
    throw err;
  }
};

module.exports = {
  Select,
  Update,
  Insert,
  Delete,
  Transaction,
};
