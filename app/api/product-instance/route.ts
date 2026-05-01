import {
  createProductInstance,
  getProductInstances
} from "@/lib/services/productInstanceService";

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

    const productInstances = await getProductInstances(projectId);

    return Response.json(productInstances);
  } catch (error) {
    console.error("Failed to fetch product instances:", error);

    return Response.json(
      { error: "Failed to fetch product instances" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const productInstance = await createProductInstance(body);

    return Response.json(productInstance, { status: 201 });
  } catch (error) {
    console.error("Failed to create product instance:", error);

    return Response.json(
      { error: "Failed to create product instance" },
      { status: 500 }
    );
  }
}
