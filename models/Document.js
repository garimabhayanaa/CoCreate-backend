import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["doc", "code"], required: true }, // Only "doc" and "code" allowed
  content: { type: String, default: "" },
  owner: { type: String, required: true },
  collaborators: [
    {
      email: String,
      permission: { type: String, enum: ["view", "edit"], default: "view" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Document= mongoose.model("Document", DocumentSchema);
export default Document;
