import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  documentId: { type: String, required: true }, // Links chat to a document
  sender: { type: String, required: true }, // Firebase UID of sender
  senderEmail: { type: String, required: true }, // User's email for display
  message: { type: String, required: true },
  mentions: [{ type: String }], // Mentioned users (emails)
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
