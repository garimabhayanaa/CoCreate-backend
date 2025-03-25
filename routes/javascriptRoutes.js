import express from "express";
import { runJavaScriptCode } from "../utils/runJavaScript.js";

const router = express.Router();

router.post("/run-javascript", (req, res) => {
  const { code } = req.body;
  runJavaScriptCode(code, (output) => res.json({ output }));
});

export default router;
