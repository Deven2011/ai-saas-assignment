import mongoose from "mongoose";

const ProductInstanceSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  name: { type: String, required: true },
  productType: { type: String, required: true, default: "AI Assistant" },
  integrations: {
    shopify: { type: Boolean, default: false },
    crm: { type: Boolean, default: false }
  }
});

export default mongoose.models.ProductInstance ||
  mongoose.model("ProductInstance", ProductInstanceSchema);
