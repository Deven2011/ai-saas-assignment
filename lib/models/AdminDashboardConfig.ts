import mongoose from "mongoose";

const AdminDashboardConfigSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    sections: [
      {
        type: { type: String, required: true },
        title: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.AdminDashboardConfig ||
  mongoose.model("AdminDashboardConfig", AdminDashboardConfigSchema);
