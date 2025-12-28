require('dotenv').config();
const app = require('./app');
const connectMongo = require('./db/mongo');
require('./jobs/cleanupWorkspaces');

const PORT = process.env.PORT || 5000;

connectMongo();

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
