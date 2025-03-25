import express from "express";
import { exec } from "child_process";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ output: "No code provided" });
  }

  const filename = `temp_${uuidv4()}.py`;
  fs.writeFileSync(filename, code);

  exec(`python3 ${filename}`, (error, stdout, stderr) => {
    fs.unlinkSync(filename); // Delete the temp file

    if (error) {
      console.error("Execution Error:", stderr);
      return res.json({ output: stderr || "Error executing code" });
    }

    console.log("Python Output:", stdout);
    res.json({ output: stdout.trim() || "No Output" });
  });
});

export default router;


