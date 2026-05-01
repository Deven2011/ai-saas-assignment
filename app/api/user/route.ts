import { createUser, getUsers } from "@/lib/services/userService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const users = await getUsers(projectId!);

  return Response.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const user = await createUser(body);

  return Response.json(user);
}