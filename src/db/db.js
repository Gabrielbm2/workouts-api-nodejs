const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getDatabase = () => {
  return pool;
};

module.exports = {
  getDatabase,
};
