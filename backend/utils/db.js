const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // necesario para conectar a RENDER
  }
});

module.exports = pool;