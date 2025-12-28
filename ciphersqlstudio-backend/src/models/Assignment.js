const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  columnName: String,
  dataType: String,
});

const TableSchema = new mongoose.Schema({
  tableName: String,
  columns: [ColumnSchema],
  rows: [mongoose.Schema.Types.Mixed],
});

const AssignmentSchema = new mongoose.Schema(
  {
    title: String,
    description: String, 
    question: String,
    sampleTables: [TableSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', AssignmentSchema);
