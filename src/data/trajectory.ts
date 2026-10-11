export const education = [
  { year: '2023–2027', name: 'Universidade Salvador (UNIFACS)', course: 'Bacharelado em Engenharia de Software', note: 'Conclusão prevista: 2027' },
  { year: '2022', name: 'FISK English Course', course: 'Formação em inglês', note: undefined },
];
export const repertoire = [
  { title: 'Backend & APIs', items: ['Python', 'FastAPI', 'APIs REST', 'Java'], context: 'Python e FastAPI conectam os três projetos. Java também faz parte do meu repertório.' },
  { title: 'Desenvolvimento web', items: ['JavaScript', 'HTML', 'CSS'], context: 'Conhecimentos para construir interfaces; BookMind utiliza React e TypeScript no frontend.' },
  { title: 'Dados & persistência', items: ['SQL', 'PostgreSQL', 'SQLite', 'SQLAlchemy', 'Alembic'], context: 'PostgreSQL em BookMind e Vox; SQLite na persistência local do Echo.' },
  { title: 'Inteligência Artificial', items: ['APIs de IA', 'Google Gemini', 'Sentence Transformers', 'Busca semântica'], context: 'Gemini no BookMind; representações de texto e recuperação semântica no Echo.' },
  { title: 'Cloud & ferramentas', items: ['AWS', 'Git', 'GitHub', 'Power BI', 'Scrum'], context: 'Repertório de cloud, versionamento, análise de dados e organização do trabalho, complementado por cursos e programas educacionais.' },
];
export const courses = [
  { year: '2025', name: 'AWS Academy Graduate', type: 'Formação complementar · AWS Academy' },
  { year: '2025', name: 'Power BI', type: 'Curso · Fundação Bradesco' },
  { year: '2024', name: 'Scrum Fundamentals Certified', type: 'Certificação' },
  { year: '2022', name: 'Michigan Language Assessment', type: 'Avaliação de idioma' },
];
export const appliedKnowledge = {
  bookmind: { purpose: 'Plataforma de descoberta e análise de livros que integra APIs bibliográficas, persistência em banco de dados e inteligência artificial.', skills: ['Backend com Python e FastAPI; organização de APIs REST.', 'Integração com Google Books, Open Library e Google Gemini.', 'Tratamento e persistência de dados com PostgreSQL.'] },
  vox: { purpose: 'Comunicação Aumentativa e Alternativa (CAA), com foco em PECS, categorias e pictogramas para apoiar a comunicação.', skills: ['Backend atual: Python, FastAPI, SQLAlchemy, PostgreSQL, Alembic e Pydantic.', 'Modelagem de dados, migrations e APIs para categorias e pictogramas.'] },
  echo: { purpose: 'Sistema pessoal de memória externa para capturar, organizar e recuperar ideias em momentos relevantes, com abordagem local-first.', skills: ['APIs com Python e FastAPI; persistência local com SQLite e SQLAlchemy.', 'Busca semântica e representações vetoriais com Sentence Transformers e NumPy.', 'Recuperação de informações e organização de eventos de recuperação.'] },
};