import fetch from "node-fetch";

export const runSwiftCode = async (code, callback) => {
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "swift",
        version: "5.3.3",
        files: [{ content: code }],
      }),
    });

    const data = await response.json();
    callback(data.run.output || "No Output");
  } catch (error) {
    callback("Error executing Swift code");
  }
};
