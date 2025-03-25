import express from "express";
import ChangeLog from "../models/ChangeLog.js";

const router = express.Router();

// Log a change
router.post("/log", async (req, res) => {
  try {
    const { documentId, user, userEmail, changes } = req.body;

    const newChange = new ChangeLog({ documentId, user, userEmail, changes });
    await newChange.save();

    res.status(201).json(newChange);
  } catch (error) {
    console.error("Change Log Error:", error);
    res.status(500).json({ message: "Failed to log changes." });
  }
});

// Fetch change history for a document
router.get("/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params; // Extract documentId from URL params

    if (!documentId) {
      return res.status(400).json({ message: "Document ID is required." });
    }

    const logs = await ChangeLog.find({ documentId }).sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    console.error("Change Log Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch change logs." });
  }
});


export default router;