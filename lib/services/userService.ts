import { connectDB } from "@/lib/db/connect";
import User from "@/lib/models/User";

export async function createUser(data: {
  name: string;
  role: "admin" | "member";
  projectId: string;
}) {
  await connectDB();

  const user = await User.create(data);

  return user;
}

export async function getUsers(projectId: string) {
  await connectDB();

  return await User.find({ projectId });
}