import { sendMessage } from "@/lib/services/chatService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, productInstanceId, message } = body;

    if (!projectId) {
      throw new Error("projectId is required");
    }

    if (!productInstanceId) {
      throw new Error("productInstanceId is required");
    }

    if (!message) {
      throw new Error("message is required");
    }

    console.log("Chat route received message:", {
      projectId,
      productInstanceId,
      message
    });

    const conversation = await sendMessage({
      projectId,
      productInstanceId,
      message
    });

    return Response.json(conversation);
  } catch (error) {
    console.error("CHAT ERROR:", error);
    const message =
      error instanceof Error ? error.message : "Failed to send chat message";

    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}
