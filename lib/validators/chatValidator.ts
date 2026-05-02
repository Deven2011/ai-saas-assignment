import { z } from "zod";

export const sendMessageSchema = z.object({
  projectId: z.string().min(1),
  productInstanceId: z.string().min(1),
  message: z.string().min(1)
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
