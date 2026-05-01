import ProductInstance from "@/lib/models/ProductInstance";

export type ProductInstanceData = {
  projectId: string;
  name: string;
  productType?: string;
  integrations?: {
    shopify?: boolean;
    crm?: boolean;
  };
};

export async function createProductInstanceRecord(data: ProductInstanceData) {
  return await ProductInstance.create(data);
}

export async function findProductInstancesByProjectId(projectId: string) {
  return await ProductInstance.find({ projectId });
}
