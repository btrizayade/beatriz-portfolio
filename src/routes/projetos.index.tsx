import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Github } from 'lucide-react';
import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { pageHead } from '@/data/projects';

export const Route = createFileRoute('/projetos/')({
  head: () => pageHead('Projetos', 'Echo, Vox e BookMind em profundidade: problema, funcionalidades, arquitetura, stack e decisões técnicas dos projetos de Beatriz Ayade.'),
  component: ProjectsPage,
});

type Stack = { label: string; items: string };
type Node = { label: string; role: string };
type DeepDive = {
  id: string; num: string; name: string; concept: string; lead: string; repo: string; demo?: string;
  problem: string[]; goal: string; features: string[]; highlight?: ReactNode;
  arch: string[]; nodes: Node[]; flow: string[]; archText: string[]; extra?: ReactNode; stack: Stack[]; challenges: string; next?: string;
};

const dives: DeepDive[] = [
  {
    id: 'echo', num: '01', name: 'Echo', concept: 'Memória criativa não generativa.', repo: 'https://github.com/btrizayade/Echo',
    lead: 'Um sistema de memória criativa pessoal para capturar, organizar e recuperar fragmentos de ideias produzidos pela própria pessoa.',
    problem: ['Pensamentos, anotações, referências e registros criativos costumam ficar espalhados entre diferentes aplicativos e acabam esquecidos.', 'Preservar ideias em desenvolvimento e reencontrar materiais autorais depois de longos períodos é difícil e ideias preciosas podem ser perdidas.'],
    goal: 'Uma extensão da memória humana: ambiente organizado para armazenar fragmentos, estabelecer conexões e facilitar a redescoberta. Princípio central: Inteligência Artificial utilizada para ampliar a capacidade de organizar e recuperar o que o usuário produziu.',
    features: ['Capturas em texto, imagem e áudio', 'Organização por temas\u00a0', 'Sistema de favoritos', 'Busca por título, conteúdo, temas e tipo', 'Filtros por formato', 'Área de Resgates para capturas esquecidas', 'Histórico de eventos de resgate e de utilização'],
    highlight: <div className="dd-callout"><h4>Mecanismo de Resgates</h4><p>A seleção acontece no backend, com uma pontuação determinística que considera o tempo sem revisita, a ausência de visitas anteriores e a correspondência com temas em foco.</p><div className="dd-score"><div><strong>7 dias</strong><span>sem atenção para ficar elegível</span></div><div><strong>até 60</strong><span>pontos pelos dias sem atenção</span></div><div><strong>+14</strong><span>se nunca foi revisitada</span></div><div><strong>+20</strong><span>se combina com um tema em foco</span></div></div><p className="mt-4">Depois de aparecer em um resgate, a captura aguarda sete dias antes de poder ser apresentada novamente.</p></div>,
    flow: ['Captura', 'Organização por temas', 'Busca e filtros', 'Resgate'],
    nodes: [
      { label: 'Frontend · React', role: 'Interface em React 19 + TypeScript (Vite) para capturar, buscar, filtrar e revisitar fragmentos.' },
      { label: 'API · FastAPI', role: 'Recebe as requisições, valida dados com Pydantic e concentra as regras de negócio.' },
      { label: 'Serviço de Resgates', role: 'Separado das rotas: calcula a pontuação determinística que escolhe capturas esquecidas.' },
      { label: 'SQLite · SQLAlchemy', role: 'Persiste capturas, temas, favoritos e o histórico de eventos de resgate e utilização.' },
      { label: 'Mídia · armazenamento local', role: 'Guarda arquivos de imagem e áudio, validados com Pillow e Mutagen.' },
    ],
    arch: ['Frontend · React', 'API · FastAPI', 'SQLite · SQLAlchemy', 'Mídia · armazenamento local'],
    archText: ['O frontend consome uma API backend responsável pela persistência e pelas regras de negócio. Os dados ficam em SQLite e os arquivos de imagem e áudio em armazenamento local.', 'O serviço de resgates é separado das rotas da aplicação, isolando a lógica de pontuação.'],
    stack: [{ label: 'FRONTEND', items: 'React 19 · TypeScript · Vite · React Router · Lucide React · CSS' }, { label: 'BACKEND', items: 'Python · FastAPI · Pydantic · SQLAlchemy · SQLite · Uvicorn' }, { label: 'QUALIDADE', items: 'Pytest · ESLint · TypeScript' }, { label: 'MÍDIA', items: 'Pillow e Mutagen para validar imagem e áudio' }],
    challenges: 'Organizar diferentes tipos de captura em uma estrutura comum, modelar os relacionamentos entre capturas e temas, persistir os favoritos e desenvolver um mecanismo determinístico de recuperação de conteúdo.',
    next: 'Ampliar a experiência multimídia, incluindo transcrição de registros sonoros e novas formas de explorar conexões entre fragmentos.',
  },
  {
    id: 'vox', num: '02', name: 'Vox', concept: 'Comunicação Aumentativa e Alternativa com pictogramas.', repo: 'https://github.com/btrizayade/Vox',
    lead: 'Uma estrutura organizada para criar e utilizar pranchas de comunicação personalizadas a partir de pictogramas.',
    problem: ['Ferramentas digitais de Comunicação Aumentativa e Alternativa (CAA) são importantes para pessoas que utilizam recursos visuais como apoio à comunicação.'],
    goal: 'Estruturar uma aplicação que facilite o acesso, a organização e a personalização de pictogramas: símbolos organizados em categorias, associados a perfis e montados em pranchas adaptadas a cada necessidade.',
    features: ['Cadastro e autenticação de usuários', 'Perfis associados ao usuário', 'Catálogo de pictogramas com nome, imagem e categoria', 'Organização por categorias', 'Consulta e filtragem de pictogramas', 'Criação e gerenciamento de pranchas personalizadas', 'Pranchas de sistema e pranchas personalizadas', 'Associação de pictogramas às pranchas', 'Remoção de pictogramas das pranchas', 'Organização e reordenação dos itens'],
    flow: ['Usuário', 'Perfil', 'Prancha', 'Itens', 'Pictogramas'],
    nodes: [
      { label: 'Usuários', role: 'Cadastro e autenticação com JWT; senhas com hash Argon2. Um usuário possui perfis.' },
      { label: 'Perfis', role: 'Associados ao usuário; podem possuir pranchas personalizadas.' },
      { label: 'Pranchas', role: 'De sistema ou personalizadas. Possuem itens, com acesso validado.' },
      { label: 'Itens', role: 'Referenciam pictogramas e guardam a posição. Não há pictograma duplicado na mesma prancha.' },
      { label: 'Pictogramas', role: 'Nome, imagem e categoria. Os assets ficam no Supabase Storage.' },
      { label: 'Categorias', role: 'Agrupam os pictogramas para consulta e filtragem.' },
    ],
    arch: ['Usuários', 'Perfis', 'Pranchas', 'Itens', 'Pictogramas', 'Categorias'],
    archText: ['Os módulos de usuários, perfis, categorias, pictogramas, pranchas e itens de prancha são separados. Os assets dos pictogramas ficam no Supabase Storage.'],
    extra: <><ul className="dd-relations"><li>Usuários possuem perfis</li><li>Perfis podem possuir pranchas personalizadas</li><li>Pranchas possuem itens</li><li>Itens referenciam pictogramas</li><li>Pictogramas pertencem a categorias</li><li>Pranchas de sistema são diferenciadas das personalizadas</li></ul><p className="mt-4">Regras de integridade impedem pictogramas duplicados na mesma prancha e mantêm as posições dos itens organizadas.</p></>,
    stack: [{ label: 'BACKEND', items: 'Python · FastAPI · Pydantic · Python Multipart' }, { label: 'DADOS', items: 'PostgreSQL · SQLAlchemy · Alembic' }, { label: 'SEGURANÇA', items: 'JWT · Argon2 para hash de senhas' }, { label: 'ARMAZENAMENTO', items: 'Supabase Storage para os pictogramas' }],
    challenges: 'Modelagem relacional e organização das entidades, implementação das operações CRUD, validação de acesso às pranchas e integridade dos relacionamentos.',
    next: 'Evoluir a experiência de comunicação e as possibilidades de personalização.',
  },
  {
    id: 'bookmind', num: '03', name: 'BookMind', concept: 'Descoberta e recomendação literária inteligente.', repo: 'https://github.com/btrizayade/BookMind', demo: 'https://book-mind-ashy.vercel.app/',
    lead: 'Plataforma que usa Inteligência Artificial e análise estruturada de características de livros para encontrar obras compatíveis com interesses, preferências e humor.',
    problem: ['Encontrar um livro que corresponda não só ao gênero desejado, mas à experiência de leitura procurada, é difícil com recomendações baseadas apenas em gêneros.'],
    goal: 'Considerar características narrativas, atmosfera, intensidade emocional e preferências pessoais para apresentar recomendações mais relevantes.',
    features: ['Busca com Google Books e Open Library', 'Título, autor, capa, descrição, categorias, avaliações e links', 'Resumos gerados com Google Gemini', 'Análise literária com Book DNA', 'Reading Profile', 'Recomendações por gênero e preferências', 'Seleção de humor ou experiência de leitura', 'Filtragem por quantidade de páginas', 'Pontuação ponderada de compatibilidade', 'Explicações personalizadas de cada recomendação', 'Cadastro e autenticação de usuários'],
    highlight: <div className="dd-callout"><h4>Book DNA & Reading Profile</h4><p><b>Book DNA</b> representa a intensidade (0 a 100) com que um livro se relaciona a categorias literárias:</p><div className="dd-pills">{['romance', 'fantasia', 'romantasia', 'thriller', 'mistério', 'ficção científica', 'terror', 'desenvolvimento pessoal', 'não ficção', 'young adult'].map(t => <span key={t}>{t}</span>)}</div><p className="mt-4"><b>Reading Profile</b> analisa a experiência de leitura:</p><div className="dd-pills">{['intensidade emocional', 'mistério e suspense', 'facilidade de leitura', 'potencial de emocionar', 'atmosfera sombria', 'desafio intelectual', 'relaxante', 'reflexivo', 'acolhedor'].map(t => <span key={t}>{t}</span>)}</div><p className="mt-4">A recomendação combina dados estruturados, preferências do leitor e uma pontuação ponderada. A quantidade de páginas filtra os livros elegíveis; a pontuação os classifica. O Gemini gera explicações sobre por que cada livro combina com o leitor.</p></div>,
    flow: ['Preferências', 'Análise literária', 'Compatibilidade', 'Recomendação'],
    nodes: [
      { label: 'Frontend · Vercel', role: 'React + TypeScript (Vite): busca, escolha de humor, filtros e exibição das recomendações.' },
      { label: 'API · FastAPI no Render', role: 'Autenticação (JWT em cookies HttpOnly, CSRF, Argon2), pontuação ponderada e orquestração das integrações.' },
      { label: 'PostgreSQL · Neon', role: 'Persiste usuários, dados literários e as análises (Book DNA e Reading Profile) via SQLAlchemy e Alembic.' },
      { label: 'Gemini + Google Books + Open Library', role: 'Google Books e Open Library fornecem os dados dos livros; o Gemini gera resumos e explicações.' },
    ],
    arch: ['Frontend · Vercel', 'API · FastAPI no Render', 'PostgreSQL · Neon', 'Gemini + Google Books + Open Library'],
    archText: ['O frontend em React conversa com a API FastAPI, que persiste dados literários e análises no PostgreSQL e integra fontes externas e IA.', 'Sessões protegidas com JWT em cookies HttpOnly, proteção CSRF e senhas com Argon2.'],
    stack: [{ label: 'FRONTEND', items: 'React · TypeScript · Vite' }, { label: 'BACKEND', items: 'Python · FastAPI · SQLAlchemy · PostgreSQL · Alembic' }, { label: 'IA & INTEGRAÇÕES', items: 'Google Gemini · Google Books API · Open Library API' }, { label: 'SEGURANÇA', items: 'JWT · Cookies HttpOnly · CSRF · Argon2' }, { label: 'INFRA', items: 'Neon · Render · Vercel' }],
    challenges: 'Integrar diferentes fontes externas de informação, persistir dados literários e análises, combinar pontuação determinística com recursos de IA e implementar autenticação segura para sessões.',
  },
];


const groups = [
  { id: 'visao', label: 'Visão geral' },
  { id: 'produto', label: 'Produto' },
  { id: 'arquitetura', label: 'Arquitetura' },
  { id: 'engenharia', label: 'Engenharia' },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return <section className="dd-block"><h3>{title}</h3><div>{children}</div></section>;
}

function useActive(ids: string[], offset = 0.35) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * offset;
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= line) cur = id; }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join(',')]);
  return active;
}

function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: reduce ? 'auto' : 'smooth' });
}

function Diagram({ d }: { d: DeepDive }) {
  const [sel, setSel] = useState(0);
  return <div className="dd-diagram">
    <div className="dd-arch" role="tablist" aria-label={`Arquitetura do ${d.name}`}>
      {d.nodes.map((n, i) => <Fragment key={n.label}>
        <button type="button" role="tab" aria-selected={sel === i} className={sel === i ? 'is-on' : ''} onClick={() => setSel(i)}>{n.label}</button>
        {i < d.nodes.length - 1 && <i aria-hidden>→</i>}
      </Fragment>)}
    </div>
    <p className="dd-node-role" aria-live="polite"><b>{d.nodes[sel]?.label}</b> — {d.nodes[sel]?.role}</p>
    <details className="dd-all-nodes"><summary>Ver todas as camadas</summary><ul>{d.nodes.map(n => <li key={n.label}><b>{n.label}</b> — {n.role}</li>)}</ul></details>
  </div>;
}

function CaseStudy({ d, i }: { d: DeepDive; i: number }) {
  const ids = groups.map(g => `${d.id}-${g.id}`);
  const active = useActive(ids, 0.4);
  const prev = dives[i - 1], next = dives[i + 1];
  return <article id={d.id} className="dd-project">
    <header className="dd-head"><div><span className="dd-num">{d.num}</span><h2>{d.name}<span className="text-highlight">.</span></h2><p className="dd-concept">{d.concept}</p><p className="dd-lead">{d.lead}</p></div>
      <div className="dd-links"><a href={d.repo} target="_blank" rel="noreferrer"><span className="flex items-center gap-2"><Github size={15}/>Repositório</span><ArrowUpRight size={15}/></a>{d.demo ? <a href={d.demo} target="_blank" rel="noreferrer">Acesse o BookMind<ArrowUpRight size={15}/></a> : <span className="dd-nodemo">Em desenvolvimento.</span>}</div></header>
    <ol className="dd-flow" aria-label="Fluxo principal">{d.flow.map(f => <li key={f}>{f}</li>)}</ol>
    <div className="dd-tabs" role="navigation" aria-label={`Seções do ${d.name}`}>
      {groups.map(g => <button key={g.id} type="button" className={active === `${d.id}-${g.id}` ? 'is-on' : ''} aria-current={active === `${d.id}-${g.id}` ? 'true' : undefined} onClick={() => go(`${d.id}-${g.id}`)}>{g.label}</button>)}
    </div>
    <div id={ids[0]} className="dd-group">
      <Block title="Problema">{d.problem.map(p => <p key={p}>{p}</p>)}</Block>
      <Block title="Objetivo"><p>{d.goal}</p></Block>
    </div>
    <div id={ids[1]} className="dd-group">
      <Block title="Funcionalidades"><ol className="dd-features">{d.features.map(f => <li key={f}>{f}</li>)}</ol>{d.highlight && <div className="mt-6">{d.highlight}</div>}</Block>
    </div>
    <div id={ids[2]} className="dd-group">
      <Block title="Arquitetura"><Diagram d={d} />{d.archText.map(p => <p key={p}>{p}</p>)}{d.extra}</Block>
      <Block title="Stack por responsabilidade"><div className="dd-stack">{d.stack.map(s => <div key={s.label}><h4>{s.label}</h4><p>{s.items}</p></div>)}</div></Block>
    </div>
    <div id={ids[3]} className="dd-group">
      <Block title="Desafios e decisões"><p>{d.challenges}</p></Block>
      {d.next && <Block title="Próximos passos"><div className="dd-planned"><b>EM DESENVOLVIMENTO</b><p>{d.next}</p></div></Block>}
    </div>
    <nav className="dd-pager" aria-label="Outros projetos">
      {prev ? <button type="button" onClick={() => go(prev.id)}>← {prev.name}</button> : <span />}
      {next ? <button type="button" onClick={() => go(next.id)}>{next.name} →</button> : <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Voltar ao topo ↑</button>}
    </nav>
  </article>;
}

function ProjectsPage() {
  const active = useActive(dives.map(d => d.id), 0.3);
  return <main className="page-container inner-page">
    <h1 className="page-heading">Projetos<span className="text-highlight">.</span></h1>
    <p className="page-intro">Coisas que penso, construo e desenvolvo.<br />Problema, funcionalidades, arquitetura e decisões técnicas de cada projeto.</p>
    <nav className="dd-index" aria-label="Projetos nesta página">{dives.map(d => <a key={d.id} href={`#${d.id}`} className={active === d.id ? 'is-on' : ''} onClick={e => { e.preventDefault(); go(d.id); }}><span>{d.num}</span>{d.name}</a>)}</nav>
    {dives.map((d, i) => <CaseStudy key={d.id} d={d} i={i} />)}
  </main>;
}
