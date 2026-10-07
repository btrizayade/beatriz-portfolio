import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/projetos')({ component: ProjectsLayout });
function ProjectsLayout() { return <Outlet />; }
