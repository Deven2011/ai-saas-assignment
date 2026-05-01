import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  },
  projectId: { type: String, required: true }
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);