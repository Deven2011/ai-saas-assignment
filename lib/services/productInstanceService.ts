import {
  createProductInstanceRecord,
  findProductInstancesByProjectId,
  updateProductInstanceIntegrations,
  type ProductInstanceData
} from "@/lib/access/productInstanceAccess";
import { connectDB } from "@/lib/db/connect";

export async function createProductInstance(data: ProductInstanceData) {
  await connectDB();

  console.log("Creating product instance:", data);

  const productInstance = await createProductInstanceRecord(data);

  return productInstance;
}

export async function getProductInstances(projectId: string) {
  await connectDB();

  console.log("Fetching product instances for projectId:", projectId);

  const productInstances = await findProductInstancesByProjectId(projectId);

  return productInstances;
}

export async function updateProductInstance(data: {
  productInstanceId: string;
  integrations: ProductInstanceData["integrations"];
}) {
  await connectDB();

  const productInstance = await updateProductInstanceIntegrations(
    data.productInstanceId,
    data.integrations
  );

  return productInstance;
}
