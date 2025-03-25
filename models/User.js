import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model("User", UserSchema);
export default User;