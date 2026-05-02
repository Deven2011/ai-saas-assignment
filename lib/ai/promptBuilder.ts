export type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type BuildPromptParams = {
  history: { role: "user" | "assistant"; content: string }[];
  integrations: {
    shopify?: boolean;
    crm?: boolean;
  };
  userMessage: string;
};

class PromptBuilder {
  buildPrompt(params: BuildPromptParams): AIMessage[] {
    const messages: AIMessage[] = [];

    messages.push({
      role: "system",
      content: "You are a SaaS AI assistant. Be concise and helpful."
    });

    messages.push({
      role: "system",
      content: `Active integrations:
- Shopify: ${params.integrations.shopify ? "ENABLED" : "DISABLED"}
- CRM: ${params.integrations.crm ? "ENABLED" : "DISABLED"}`
    });

    const recentHistory = params.history.slice(-10);
    for (const msg of recentHistory) {
      messages.push(msg);
    }

    messages.push({
      role: "user",
      content: params.userMessage
    });

    return messages;
  }
}

export default PromptBuilder;
