import mongoose from "mongoose";

const ChangeLogSchema = new mongoose.Schema({
  documentId: { type: String, required: true }, // Links changes to a document
  user: { type: String, required: true }, // Firebase UID of user making changes
  userEmail: { type: String, required: true }, // Email of the user
  changes: { type: String, required: true }, // Description of the change
  timestamp: { type: Date, default: Date.now },
});

const ChangeLog = mongoose.model("ChangeLog", ChangeLogSchema);
export default ChangeLog;