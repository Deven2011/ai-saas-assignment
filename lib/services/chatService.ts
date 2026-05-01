import { connectDB } from "@/lib/db/connect";
import Conversation from "@/lib/models/Conversation";
import ProductInstance from "@/lib/models/ProductInstance";

type SendMessageData = {
  projectId: string;
  productInstanceId: string;
  message: string;
};

function createMockAIResponse(message: string, context: string[]) {
  const responseContext = [message, ...context].filter(Boolean).join(" | ");

  return `AI Response based on: ${responseContext}`;
}

export async function sendMessage({
  projectId,
  productInstanceId,
  message
}: SendMessageData) {
  if (!projectId) {
    throw new Error("projectId is required");
  }

  if (!productInstanceId) {
    throw new Error("productInstanceId is required");
  }

  if (!message) {
    throw new Error("message is required");
  }

  await connectDB();

  console.log("Incoming:", {
    projectId,
    productInstanceId,
    message
  });

  let conversation = await Conversation.findOne({
    projectId,
    productInstanceId
  });

  if (!conversation) {
    console.log("Creating new conversation:", {
      projectId,
      productInstanceId
    });

    conversation = await Conversation.create({
      projectId,
      productInstanceId,
      messages: []
    });
  }

  if (!conversation.messages) {
    conversation.messages = [];
  }

  conversation.messages.push({
    role: "user",
    content: message
  });

  const productInstance = await ProductInstance.findOne({
    _id: productInstanceId,
    projectId
  });

  console.log("Fetched product instance for chat:", productInstance);

  if (!productInstance) {
    throw new Error("Product instance not found");
  }

  const context: string[] = [];

  if (productInstance?.integrations?.shopify) {
    context.push("User has Shopify data");
  }

  if (productInstance?.integrations?.crm) {
    context.push("User has CRM data");
  }

  const aiResponse = createMockAIResponse(message, context);

  console.log("Generated mock AI response:", aiResponse);

  conversation.messages.push({
    role: "assistant",
    content: aiResponse
  });

  await conversation.save();

  return conversation;
}
