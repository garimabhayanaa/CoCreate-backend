import express from "express";
import { runCCode } from "../utils/runC.js";

const router = express.Router();

router.post("/run-c", (req, res) => {
  const { code } = req.body;
  runCCode(code, (output) => res.json({ output }));
});

export default router;
