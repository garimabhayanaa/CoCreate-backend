import express from "express";
import Document from "../models/Document.js"

const router = express.Router();

// Add a collaborator
router.post("/add", async (req, res) => {
  try {
    const { documentId, email, permission } = req.body;
    const document = await Document.findById(documentId);

    if (!document) return res.status(404).json({ message: "Document not found." });

    // Check if collaborator already exists
    const existingCollaborator = document.collaborators.find((c) => c.email.toLowerCase() === email.toLowerCase());
    if (existingCollaborator) {
      existingCollaborator.permission = permission; // Update permission if already added
    } else {
      document.collaborators.push({ email, permission });
    }

    await document.save();
    res.status(200).json({ message: "Collaborator added successfully." });
  } catch (error) {
    console.error("Error adding collaborator:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Get all collaborators for a document
router.get("/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);

    if (!document) return res.status(404).json({ message: "Document not found." });

    res.status(200).json({ collaborators: document.collaborators });
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Check document access for a user
router.get("/:documentId/:userIdOrEmail", async (req, res) => {
  try {
    const { documentId, userIdOrEmail } = req.params;
    const document = await Document.findById(documentId);

    if (!document) return res.status(404).json({ message: "Document not found." });

    // Grant access if user is the owner
    if (document.owner === userIdOrEmail) {
      return res.status(200).json({ permission: "owner" });
    }

    // Check if user is a collaborator (using case-insensitive comparison)
    const collaborator = document.collaborators.find(
      (c) => c.email.toLowerCase() === userIdOrEmail.toLowerCase()
    );
    
    if (!collaborator) {
      return res.status(403).json({ permission: "no-access" });
    }

    return res.status(200).json({ permission: collaborator.permission });
  } catch (error) {
    console.error("Error checking permissions:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Remove a collaborator
router.post("/remove", async (req, res) => {
  try {
    const { documentId, email } = req.body;
    const document = await Document.findById(documentId);

    if (!document) return res.status(404).json({ message: "Document not found." });

    // Remove collaborator from the list
    document.collaborators = document.collaborators.filter((c) => c.email !== email);

    await document.save();
    res.status(200).json({ message: "Collaborator removed successfully." });
  } catch (error) {
    console.error("Error removing collaborator:", error);
    res.status(500).json({ message: "Server error." });
  }
});


export default router;

