import express from "express";
import { runCppCode } from "../utils/runCpp.js";

const router = express.Router();

router.post("/run-cpp", async (req, res) => {
  const { code } = req.body;
  runCppCode(code, (output) => res.json({ output }));
});

export default router;
