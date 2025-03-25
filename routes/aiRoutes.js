import express from "express";
import { generateAIResponse } from "../utils/geminiAI.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { prompt, content } = req.body;
  const aiPrompt = `${prompt}\n\n${content}`;

  try {
    const aiResponse = await generateAIResponse(aiPrompt);
    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "AI service failed" });
  }
});

export default router;

