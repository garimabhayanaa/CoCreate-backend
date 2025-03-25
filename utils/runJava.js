import { exec } from "child_process";
import fs from "fs";
import path from "path";

export const runJavaCode = (code, callback) => {
  const timestamp = Date.now();
  const className = `Main_${timestamp}`; // Unique class name
  const filename = `${className}.java`; // Ensure filename matches class name
  const filepath = path.join("/tmp", filename);

  // Replace 'public class Main' with the dynamic class name
  const modifiedCode = code.replace(/public class Main/, `public class ${className}`);

  fs.writeFileSync(filepath, modifiedCode);

  exec(`javac ${filepath} && java -cp /tmp ${className}`, (error, stdout, stderr) => {
    fs.unlinkSync(filepath);
    if (error) return callback(stderr || "Error executing Java code");
    callback(stdout);
  });
};
