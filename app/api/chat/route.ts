import { sendMessage } from "@/lib/services/chatService";
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
  } catch (error: any) {
    console.error("ERROR OBJECT:", error);
    console.error("ERROR NAME:", error?.name);
    console.error("ERROR MESSAGE:", error?.message);
    console.error("ERROR STATUS:", error?.statusCode);

    if (error && error.name === "AppError") {
      return Response.json(
        { error: error.message },
        { status: error.statusCode || 400 }
      );
    }

    console.error(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
