import express from "express";
import Chat from "../models/Chat.js";


const router = express.Router();

// Send a message
router.post("/send", async (req, res) => {
  try {
    const { documentId, sender, senderEmail, message, mentions } = req.body;

    const newMessage = new Chat({ documentId, sender, senderEmail, message, mentions });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ message: "Failed to send message." });
  }
});

// Fetch messages for a document
router.get("/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params; // Extract documentId from URL params

    if (!documentId) {
      return res.status(400).json({ message: "Document ID is required." });
    }

    const messages = await Chat.find({ documentId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Chat Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

export default router;
