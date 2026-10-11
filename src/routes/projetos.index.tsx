import { createFileRoute } from '@tanstack/react-router';
import { ProjectCard } from '@/components/portfolio/project-card';
import { projects, pageHead } from '@/data/projects';
export const Route = createFileRoute('/projetos/')({ head: () => pageHead('Projetos', 'BookMind, Vox e Echo: projetos de Beatriz Ayade em inteligência artificial, backend, acessibilidade e busca semântica.'), component: ProjectsPage });
function ProjectsPage() { return <main className="page-container inner-page"><div className="eyebrow">01 / CÓDIGO EM PRÁTICA</div><h1 className="page-heading">Ideias que viram <em>projetos.</em></h1><p className="page-intro"></p><div className="project-grid listing-grid">{projects.map(project => <ProjectCard key={project.slug} project={project}/>)}</div></main>; }
