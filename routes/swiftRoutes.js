import express from "express";
import { runSwiftCode } from "../utils/runSwift.js";

const router = express.Router();

router.post("/run-swift", async (req, res) => {
  const { code } = req.body;
  runSwiftCode(code, (output) => res.json({ output }));
});

export default router;
