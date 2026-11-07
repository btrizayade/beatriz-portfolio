import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Github } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';
import { pageHead } from '@/data/projects';

export const Route = createFileRoute('/projetos/')({
  head: () => pageHead('Projetos', 'Echo, Vox e BookMind em profundidade: problema, funcionalidades, arquitetura, stack e decisões técnicas dos projetos de Beatriz Ayade.'),
  component: ProjectsPage,
});

type Stack = { label: string; items: string };
type DeepDive = {
  id: string; num: string; name: string; concept: string; lead: string; repo: string; demo?: string;
  problem: string[]; goal: string; features: string[]; highlight?: ReactNode;
  arch: string[]; archText: string[]; extra?: ReactNode; stack: Stack[]; challenges: string; next?: string;
};

const dives: DeepDive[] = [
  {
    id: 'echo', num: '01', name: 'Echo', concept: 'Memória criativa não generativa.', repo: 'https://github.com/btrizayade/Echo',
    lead: 'Um sistema de memória criativa pessoal para capturar, organizar e recuperar fragmentos de ideias produzidos pela própria pessoa.',
    problem: ['Pensamentos, anotações, referências e registros criativos costumam ficar espalhados entre diferentes aplicativos e acabam esquecidos.', 'Preservar ideias em desenvolvimento e reencontrar materiais autorais depois de longos períodos é difícil.'],
    goal: 'Funcionar como uma extensão da memória humana: um ambiente organizado para armazenar fragmentos, estabelecer conexões entre eles e facilitar sua redescoberta. Princípio central: a IA não cria nem escreve em nome do usuário, ela amplia a capacidade de organizar e recuperar o que a própria pessoa produziu.',
    features: ['Capturas em texto, imagem e áudio', 'Organização por temas (uma captura pode ter vários)', 'Sistema de favoritos', 'Busca por título, conteúdo, temas e tipo', 'Filtros por formato', 'Área de Resgates para capturas esquecidas', 'Histórico de eventos de resgate e de utilização'],
    highlight: <div className="dd-callout"><h4>O mecanismo de Resgates</h4><p>A seleção acontece no backend, com uma pontuação determinística que considera o tempo sem revisita, a ausência de visitas anteriores e a correspondência com temas em foco.</p><div className="dd-score"><div><strong>7 dias</strong><span>sem atenção para ficar elegível</span></div><div><strong>até 60</strong><span>pontos pelos dias sem atenção</span></div><div><strong>+14</strong><span>se nunca foi revisitada</span></div><div><strong>+20</strong><span>se combina com um tema em foco</span></div></div><p className="mt-4">Depois de aparecer em um resgate, a captura aguarda sete dias antes de poder ser apresentada novamente.</p></div>,
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
    arch: ['Usuários', 'Perfis', 'Pranchas', 'Itens', 'Pictogramas', 'Categorias'],
    archText: ['Os módulos de usuários, perfis, categorias, pictogramas, pranchas e itens de prancha são separados. Os assets dos pictogramas ficam no Supabase Storage.'],
    extra: <><ul className="dd-relations"><li>Usuários possuem perfis</li><li>Perfis podem possuir pranchas personalizadas</li><li>Pranchas possuem itens</li><li>Itens referenciam pictogramas</li><li>Pictogramas pertencem a categorias</li><li>Pranchas de sistema são diferenciadas das personalizadas</li></ul><p className="mt-4">Regras de integridade impedem pictogramas duplicados na mesma prancha e mantêm as posições dos itens organizadas.</p></>,
    stack: [{ label: 'BACKEND', items: 'Python · FastAPI · Pydantic · Python Multipart' }, { label: 'DADOS', items: 'PostgreSQL · SQLAlchemy · Alembic' }, { label: 'SEGURANÇA', items: 'JWT · Argon2 para hash de senhas' }, { label: 'ARMAZENAMENTO', items: 'Supabase Storage para os pictogramas' }],
    challenges: 'Modelagem relacional e organização das entidades, implementação das operações CRUD, validação de acesso às pranchas e integridade dos relacionamentos.',
    next: 'Evoluir a experiência de comunicação e as possibilidades de personalização.',
  },
  {
    id: 'bookmind', num: '03', name: 'BookMind', concept: 'Descoberta e recomendação literária inteligente.', repo: 'https://github.com/btrizayade/BookMind', demo: 'https://book-mind-ashy.vercel.app/',
    lead: 'Uma plataforma que usa inteligência artificial e análise estruturada de características dos livros para encontrar obras compatíveis com interesses, preferências e estados de espírito.',
    problem: ['Encontrar um livro que corresponda não só ao gênero desejado, mas à experiência de leitura procurada, é difícil com recomendações baseadas apenas em gêneros.'],
    goal: 'Considerar características narrativas, atmosfera, intensidade emocional e preferências pessoais para apresentar recomendações mais relevantes.',
    features: ['Busca com Google Books e Open Library', 'Título, autor, capa, descrição, categorias, avaliações e links', 'Resumos gerados com Google Gemini', 'Análise literária com Book DNA', 'Reading Profile', 'Recomendações por gênero e preferências', 'Seleção de humor ou experiência de leitura', 'Filtragem por quantidade de páginas', 'Pontuação ponderada de compatibilidade', 'Explicações personalizadas de cada recomendação', 'Cadastro e autenticação de usuários'],
    highlight: <div className="dd-callout"><h4>Book DNA & Reading Profile</h4><p><b>Book DNA</b> representa a intensidade (0 a 100) com que um livro se relaciona a categorias literárias:</p><div className="dd-pills">{['romance', 'fantasia', 'romantasia', 'thriller', 'mistério', 'ficção científica', 'terror', 'desenvolvimento pessoal', 'não ficção', 'young adult'].map(t => <span key={t}>{t}</span>)}</div><p className="mt-4"><b>Reading Profile</b> analisa a experiência de leitura:</p><div className="dd-pills">{['intensidade emocional', 'mistério e suspense', 'facilidade de leitura', 'potencial de emocionar', 'atmosfera sombria', 'desafio intelectual', 'relaxante', 'reflexivo', 'acolhedor'].map(t => <span key={t}>{t}</span>)}</div><p className="mt-4">A recomendação combina dados estruturados, preferências do leitor e uma pontuação ponderada. A quantidade de páginas filtra os livros elegíveis; a pontuação os classifica. O Gemini gera explicações sobre por que cada livro combina com o leitor.</p></div>,
    arch: ['Frontend · Vercel', 'API · FastAPI no Render', 'PostgreSQL · Neon', 'Gemini + Google Books + Open Library'],
    archText: ['O frontend em React conversa com a API FastAPI, que persiste dados literários e análises no PostgreSQL e integra fontes externas e IA.', 'Sessões protegidas com JWT em cookies HttpOnly, proteção CSRF e senhas com Argon2.'],
    stack: [{ label: 'FRONTEND', items: 'React · TypeScript · Vite' }, { label: 'BACKEND', items: 'Python · FastAPI · SQLAlchemy · PostgreSQL · Alembic' }, { label: 'IA & INTEGRAÇÕES', items: 'Google Gemini · Google Books API · Open Library API' }, { label: 'SEGURANÇA', items: 'JWT · Cookies HttpOnly · CSRF · Argon2' }, { label: 'INFRA', items: 'Neon · Render · Vercel' }],
    challenges: 'Integrar diferentes fontes externas de informação, persistir dados literários e análises, combinar pontuação determinística com recursos de IA e implementar autenticação segura para sessões.',
  },
];

function Block({ n, label, title, children }: { n: string; label: string; title: string; children: ReactNode }) {
  return <section className="dd-block"><h3><small>{n} / {label}</small>{title}</h3><div>{children}</div></section>;
}

function ProjectsPage() {
  return <main className="page-container inner-page">
    <h1 className="page-heading">Ideias que viram <em>projetos.</em></h1>
    <p className="page-intro">Como cada projeto foi pensado, estruturado e desenvolvido: problema, funcionalidades, arquitetura e decisões técnicas.</p>
    <nav className="dd-index" aria-label="Projetos nesta página">{dives.map(d => <a key={d.id} href={`#${d.id}`}>{d.num} · {d.name}</a>)}</nav>
    {dives.map(d => <article key={d.id} id={d.id} className="dd-project">
      <header className="dd-head"><div><span className="dd-num">PROJETO {d.num}</span><h2>{d.name}<span className="text-highlight">.</span></h2><p className="dd-concept">{d.concept}</p><p className="dd-lead">{d.lead}</p></div>
        <div className="dd-links"><a href={d.repo} target="_blank" rel="noreferrer"><span className="flex items-center gap-2"><Github size={15}/>Repositório</span><ArrowUpRight size={15}/></a>{d.demo ? <a href={d.demo} target="_blank" rel="noreferrer">Demonstração online<ArrowUpRight size={15}/></a> : <span className="dd-nodemo">Sem demonstração pública no momento.</span>}</div></header>
      <Block n="01" label="MOTIVAÇÃO" title="Problema">{d.problem.map(p => <p key={p}>{p}</p>)}</Block>
      <Block n="02" label="PROPOSTA" title="Objetivo">{<p>{d.goal}</p>}</Block>
      <Block n="03" label="IMPLEMENTADO" title="Funcionalidades"><ol className="dd-features">{d.features.map(f => <li key={f}>{f}</li>)}</ol>{d.highlight && <div className="mt-6">{d.highlight}</div>}</Block>
      <Block n="04" label="POR DENTRO" title="Arquitetura"><div className="dd-arch">{d.arch.map((a, i) => <Fragment key={a}><span>{a}</span>{i < d.arch.length - 1 && <i>→</i>}</Fragment>)}</div>{d.archText.map(p => <p key={p}>{p}</p>)}{d.extra}</Block>
      <Block n="05" label="FERRAMENTAS" title="Stack por responsabilidade"><div className="dd-stack">{d.stack.map(s => <div key={s.label}><h4>{s.label}</h4><p>{s.items}</p></div>)}</div></Block>
      <Block n="06" label="ENGENHARIA" title="Desafios e decisões"><p>{d.challenges}</p></Block>
      {d.next && <Block n="07" label="EVOLUÇÃO" title="Próximos passos"><div className="dd-planned"><b>PLANEJADO · AINDA NÃO IMPLEMENTADO</b><p>{d.next}</p></div></Block>}
    </article>)}
  </main>;
}
