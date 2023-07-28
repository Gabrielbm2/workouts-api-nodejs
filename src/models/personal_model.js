const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createPersonalTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS personal (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;

    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log('Tabela do Personal criada');
    client.release();
  } catch (error) {
    console.error('Erro ao criar tabela do Personal:', error);
    throw error;
  }
};

module.exports = {
    createPersonalTable,
    insertPersonal,
    getPersonalByEmail,
};
