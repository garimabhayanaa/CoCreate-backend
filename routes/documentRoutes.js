import express from "express";
import Document from "../models/Document.js";

const router = express.Router();

// Create a new document
router.post("/create", async (req, res) => {
  try {
    const { title, type, owner } = req.body;

    const newDocument = new Document({ title, type, owner });
    await newDocument.save();

    res.status(201).json(newDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch documents owned by the user
router.get("/user/:uid", async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.params.uid });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching user documents:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Fetch documents where the user is a collaborator
router.get("/collaborator/:email", async (req, res) => {
  try {
    const documents = await Document.find({ 
      "collaborators.email": { $regex: new RegExp(req.params.email, 'i') } 
    });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Error fetching shared documents:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Get a single document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update document content
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    
    document.content = content;
    await document.save();
    
    res.status(200).json({ message: "Document updated successfully" });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a document
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Document.findByIdAndDelete(id);

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
