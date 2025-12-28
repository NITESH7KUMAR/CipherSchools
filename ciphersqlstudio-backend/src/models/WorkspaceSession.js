const mongoose = require('mongoose');

const WorkspaceSessionSchema = new mongoose.Schema({
  schemaName: { type: String, required: true },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WorkspaceSession', WorkspaceSessionSchema);
