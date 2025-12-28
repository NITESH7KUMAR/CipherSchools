require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const assignments = require('../data/CipherSqlStudio-assignment.json');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Assignment.deleteMany();

    await Assignment.insertMany(assignments);

    console.log('Mock assignments inserted successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
