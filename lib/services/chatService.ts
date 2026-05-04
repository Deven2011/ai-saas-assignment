import { AIService } from "@/lib/ai/aiService";
import PromptBuilder from "@/lib/ai/promptBuilder";
import { connectDB } from "@/lib/db/connect";
import Conversation from "@/lib/models/Conversation";
import ProductInstance from "@/lib/models/ProductInstance";
import AppError from "@/lib/utils/AppError";

type SendMessageData = {
  projectId: string;
  productInstanceId: string;
  message: string;
};

type ConversationHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function sendMessage({
  projectId,
  productInstanceId,
  message
}: SendMessageData) {
  await connectDB();

  let conversation = await Conversation.findOne({
    projectId,
    productInstanceId
  });

  if (!conversation) {
    conversation = await Conversation.create({
      projectId,
      productInstanceId,
      messages: []
    });
  }

  if (!conversation.messages) {
    conversation.messages = [];
  }

  const history: ConversationHistoryMessage[] = conversation.messages.map(
    (item: ConversationHistoryMessage) => ({
      role: item.role,
      content: item.content
    })
  );

  const productInstance = await ProductInstance.findOne({
    _id: productInstanceId,
    projectId
  });

  if (!productInstance) {
    throw new AppError("Product instance not found", 404);
  }

  const lowerMessage = message.toLowerCase();
  let responseText: string;

  if (lowerMessage.includes("orders") && productInstance.integrations?.shopify) {
    responseText = "Here are your latest orders: Order #123, Order #456";
  } else if (
    lowerMessage.includes("leads") &&
    productInstance.integrations?.crm
  ) {
    responseText = "Here are your CRM leads: Lead A, Lead B";
  } else {
    const aiService = new AIService();
    const promptBuilder = new PromptBuilder();

    const prompt = promptBuilder.buildPrompt({
      history,
      integrations: productInstance.integrations,
      userMessage: message
    });

    const aiResponse = await aiService.generateResponse({
      messages: prompt
    });

    responseText = aiResponse.text;
  }

  conversation.messages.push({
    role: "user",
    content: message
  });

  conversation.messages.push({
    role: "assistant",
    content: responseText
  });

  await conversation.save();

  return { text: responseText };
}
