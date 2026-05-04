import { getDashboardConfig } from "@/lib/services/adminDashboardService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return Response.json(
        { error: "projectId query param is required" },
        { status: 400 }
      );
    }

    const config = await getDashboardConfig(projectId);

    return Response.json(config);
  } catch (error) {
    console.error("Failed to fetch admin dashboard config:", error);

    return Response.json(
      { error: "Failed to fetch admin dashboard config" },
      { status: 500 }
    );
  }
}
