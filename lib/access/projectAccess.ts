type ProjectAccessUser = {
  projectId: string;
  role?: string;
};

export function canAccessProject(user: ProjectAccessUser, projectId: string) {
  return user.projectId === projectId;
}

export function isAdmin(user: ProjectAccessUser) {
  return user.role === "admin";
}
