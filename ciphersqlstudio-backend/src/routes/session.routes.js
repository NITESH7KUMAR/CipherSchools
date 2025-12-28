const express = require("express");
const { createWorkspace } = require("../utils/workspace");
const WorkspaceSession = require("../models/WorkspaceSession");
const Assignment = require("../models/Assignment");

const router = express.Router();

router.post("/start-session/:assignmentId", async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const schemaName = `workspace_${Date.now()}`;

    await createWorkspace(schemaName, assignment);

    await WorkspaceSession.create({
      schemaName,
      assignmentId,
    });

    res.json({ schemaName });
  } catch (err) {
    console.error("Workspace initialization failed:", err.message);
    res.status(500).json({ error: "Workspace initialization failed" });
  }
});

module.exports = router;
