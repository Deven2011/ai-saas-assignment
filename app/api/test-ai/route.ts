import { AIService } from "@/lib/ai/aiService";

export async function POST() {
  try {
    const aiService = new AIService();

    const response = await aiService.generateResponse({
      messages: [
        { role: "system", content: "You are a helpful assistant" },
        { role: "user", content: "Say hello in one short sentence" }
      ]
    });

    return Response.json(response);
  } catch {
    return Response.json(
      { error: "Failed to test AI" },
      { status: 500 }
    );
  }
}
