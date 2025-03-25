import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function generateAIResponse(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI response unavailable.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "AI service error.";
  }
};