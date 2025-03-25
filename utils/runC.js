import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const runCCode = (code, callback) => {
  const filename = `program_${Date.now()}.c`;
  const filepath = path.join("/tmp", filename);
  const outputfile = `/tmp/a.out`;

  fs.writeFileSync(filepath, code);

  exec(`gcc ${filepath} -o ${outputfile} && ${outputfile}`, (error, stdout, stderr) => {
    fs.unlinkSync(filepath);
    if (error) return callback(stderr || "Error executing C code");
    callback(stdout);
  });
};
