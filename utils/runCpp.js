import fetch from "node-fetch";

export const runCppCode = async (code, callback) => {
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "cpp",
        version: "10.2.0",
        files: [{ content: code }],
      }),
    });

    const data = await response.json();
    callback(data.run.output || "No Output");
  } catch (error) {
    callback("Error executing C++ code");
  }
};

