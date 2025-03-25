import express from "express";
import { runJavaCode } from "../utils/runJava.js";

const router = express.Router();

router.post("/run-java", (req, res) => {
  const { code } = req.body;
  runJavaCode(code, (output) => res.json({ output }));
});

export default router;
