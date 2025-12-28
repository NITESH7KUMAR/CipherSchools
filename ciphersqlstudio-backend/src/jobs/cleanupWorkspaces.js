const cron = require('node-cron');
const pool = require('../db/postgres');
const WorkspaceSession = require('../models/WorkspaceSession');

// Run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  console.log('🧹 Running workspace cleanup job');

  const EXPIRY_MINUTES = 30;
  const expiryTime = new Date(
    Date.now() - EXPIRY_MINUTES * 60 * 1000
  );

  try {
    const expiredSessions = await WorkspaceSession.find({
      createdAt: { $lt: expiryTime },
    });

    for (const session of expiredSessions) {
      const client = await pool.connect();

      try {
        console.log('Dropping schema:', session.schemaName);

        await client.query(
          `DROP SCHEMA IF EXISTS ${session.schemaName} CASCADE`
        );

        await WorkspaceSession.deleteOne({ _id: session._id });
      } catch (err) {
        console.error(
          `Failed to drop ${session.schemaName}:`,
          err.message
        );
      } finally {
        client.release();
      }
    }
  } catch (err) {
    console.error('Cleanup job error:', err.message);
  }
});
