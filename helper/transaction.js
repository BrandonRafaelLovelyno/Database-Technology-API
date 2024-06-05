const { pool } = require("../db/index.js");

const Transaction = async ({ querys }) => {
  try {
    const client = await pool.connect();
    await client.query("BEGIN");
    querys.forEach(async (query) => {
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

module.exports = { Transaction };
