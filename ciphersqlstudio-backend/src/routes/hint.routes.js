const express = require('express');
const Assignment = require('../models/Assignment');
const { generateHint } = require('../utils/llm');

const router = express.Router();

router.post('/hint/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  const { userQuery } = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    const hint = await generateHint({
      question: assignment.question,
      tables: assignment.sampleTables,
      userQuery,
    });

    res.json({ hint });
  } catch (err) {
    console.error('LLM hint error:', err.message);
    res.status(500).json({ error: 'Failed to generate hint' });
  }
});

module.exports = router;
