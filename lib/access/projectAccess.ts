export function canAccessProject(user: any, projectId: string) {
  return user.projectId === projectId;
}

export function isAdmin(user: any) {
  return user.role === "admin";
}