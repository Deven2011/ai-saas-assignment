export type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type AIRequest = {
  messages: AIMessage[];
};

export type AIResponse = {
  text: string;
};

type OpenRouterResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export class AIService {
  async generateResponse(input: AIRequest): Promise<AIResponse> {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;

      if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not configured");
      }

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: input.messages
          })
        }
      );

      if (!response.ok) {
        throw new Error("OpenRouter API request failed");
      }

      const data = (await response.json()) as OpenRouterResponse;
      const text = data.choices?.[0]?.message?.content;

      return { text: text ?? "" };
    } catch {
      return { text: "AI temporarily unavailable" };
    }
  }
}
