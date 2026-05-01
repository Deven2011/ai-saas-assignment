import { connectDB } from "@/lib/db/connect";
import Project from "@/lib/models/Project";

export async function createProject(data: {
  name: string;
  slug: string;
}) {
  await connectDB();

  const project = new Project(data);
  await project.save();

  return project;
}

export async function getProjects() {
  await connectDB();

  const projects = await Project.find();

  return projects;
}