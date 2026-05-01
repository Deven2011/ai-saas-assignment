import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    productInstanceId: { type: String, required: true },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true
        },
        content: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);
