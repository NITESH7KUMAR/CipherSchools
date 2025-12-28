const express = require('express');
const pool = require('../db/postgres');
const router = express.Router();

router.post('/execute', async (req, res) => {
  const { query, schemaName } = req.body;

  if (!schemaName) {
    return res.status(400).json({
      success: false,
      error: 'Workspace not initialized',
    });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `SET LOCAL search_path = ${schemaName}, public`
    );

    const result = await client.query(query);

    await client.query('COMMIT');

    res.json({
      success: true,
      rows: result.rows,
    });
  } catch (err) {
    await client.query('ROLLBACK');

    res.status(400).json({
      success: false,
      error: err.message,
    });
  } finally {
    client.release();
  }
});

module.exports = router;
