import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const runJavaScriptCode = (code, callback) => {
  const filename = `script_${Date.now()}.js`;
  const filepath = path.join("/tmp", filename);

  fs.writeFileSync(filepath, code);

  exec(`node ${filepath}`, (error, stdout, stderr) => {
    fs.unlinkSync(filepath);
    if (error) return callback(stderr || "Error executing JavaScript code");
    callback(stdout);
  });
};
