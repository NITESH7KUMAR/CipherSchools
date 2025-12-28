const pool = require('../db/postgres');

async function createWorkspace(schemaName, assignment) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

    for (const table of assignment.sampleTables) {
      const columnsSql = table.columns
        .map(col => `${col.columnName} ${col.dataType}`)
        .join(', ');

      await client.query(`
        CREATE TABLE ${schemaName}.${table.tableName} (
          ${columnsSql}
        )
      `);

      for (const row of table.rows) {
        const cols = Object.keys(row).join(', ');
        const values = Object.values(row)
          .map(v => `'${v}'`)
          .join(', ');

        await client.query(`
          INSERT INTO ${schemaName}.${table.tableName}
          (${cols}) VALUES (${values})
        `);
      }
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { createWorkspace };
