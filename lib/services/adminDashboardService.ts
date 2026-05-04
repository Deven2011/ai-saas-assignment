import { connectDB } from "@/lib/db/connect";
import AdminDashboardConfig from "@/lib/models/AdminDashboardConfig";

export async function getDashboardConfig(projectId: string) {
  await connectDB();

  const config = await AdminDashboardConfig.findOne({ projectId });

  if (!config) {
    return {
      projectId,
      sections: [
        { type: "stats", title: "Stats" },
        { type: "integrations", title: "Integrations" }
      ]
    };
  }

  return config;
}
