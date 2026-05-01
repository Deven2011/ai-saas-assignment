import { createProject, getProjects } from "@/lib/services/projectService";

export async function GET() {
  const projects = await getProjects();
  return Response.json(projects);
}

export async function POST(req: Request) {
  const body = await req.json();

  const project = await createProject(body);

  return Response.json(project);
}