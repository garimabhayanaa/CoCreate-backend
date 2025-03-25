import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Save User Data
router.post("/save-user", async (req, res) => {
  try {
    const { uid, email, apiKey } = req.body;

    // Check if user already exists
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, apiKey });
    } else {
      user.apiKey = apiKey; // Update API key if user exists
    }

    await user.save();
    res.status(200).json({ message: "User saved successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch user data on login
router.get("/get-user/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    let user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error." });
  }
});


// Create or update user on login
router.post("/create-user", async (req, res) => {
  try {
    const { uid, email } = req.body;

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
