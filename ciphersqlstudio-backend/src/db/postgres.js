const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123',
  database: 'ciphersqlstudio_app',
  port: 5432,
});

module.exports = pool;
