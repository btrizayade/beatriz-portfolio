import { Link } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/data/projects';

export function ProjectVisual({ project }: { project: Project }) {
  return <div className={`project-visual visual-${project.slug}`} aria-label={`Representação conceitual de ${project.name}`}>
    <span className="visual-index"></span>
{project.slug === 'bookmind' ? <div className="book-composition"><div className="book-spine" /><div className="book-cover"><BookOpen size={25} strokeWidth={1.3}/><span>Book<br/>Mind<span className="book-star"></span></span><small>histórias encontram você.</small></div></div> : project.slug === 'vox' ? <div className="vox-composition"><div className="speech-mark">vo<span>x</span><MessageCircle size={34} strokeWidth={1.4}/></div><div className="pictograms"><span>☀</span><span>♡</span><span>⌂</span></div><span className="handwritten">cada voz importa.</span></div> : <div className="echo-composition"><div className="echo-rings"><span/><span/><span/><Sparkles size={32} strokeWidth={1.2}/></div><span className="echo-word">echo<span>_</span></span><div className="echo-terminal">uma ideia, um novo sentido<span className="terminal-cursor"/></div></div>}
  </div>;
}
export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><Link to="/projetos/$slug" params={{ slug: project.slug }} className="visual-link" aria-label={`Conhecer ${project.name}`}><ProjectVisual project={project}/></Link><div className="project-details"><div className="project-category"><span>{project.category}</span><span className="tiny-dot"/></div><h3>{project.name === 'BookMind' ? 'BookMind' : project.name === 'Vox' ? 'Vox' : project.name === 'Echo' ? 'Echo' : project.name}<span className="project-number"></span></h3><p>{project.description.replace('conectando histórias a novos leitores.', 'conectando histórias a leitores.')}</p><div className="stack-tags">{project.stack.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div><div className="project-bottom"><span className={`project-status ${project.demo ? 'status-live' : ''}`}><span/>{project.status}</span><Button asChild variant="ghost" className="case-link"><Link to="/projetos/$slug" params={{ slug: project.slug }}>Ver mais <ArrowUpRight/></Link></Button></div></div></article>;
}
