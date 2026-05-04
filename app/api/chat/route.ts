import { sendMessage } from "@/lib/services/chatService";
import AppError from "@/lib/utils/AppError";
import { sendMessageSchema } from "@/lib/validators/chatValidator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = sendMessageSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await sendMessage(parsed.data);

    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof AppError) {
      return Response.json(
        { error: error.message },
        { status: error.statusCode || 400 }
      );
    }

    console.error("Failed to send chat message:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
