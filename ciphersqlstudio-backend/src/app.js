const express = require('express');
const cors = require('cors');
const queryRoutes = require('./routes/query.routes');
const sessionRoutes = require('./routes/session.routes');
const assignmentRoutes = require('./routes/assignment.routes');
const hintRoutes = require('./routes/hint.routes');
const authRoutes = require("./routes/auth");


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use('/api', queryRoutes);
app.use('/api', sessionRoutes);
app.use('/api', hintRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/assignments', assignmentRoutes);

module.exports = app;
