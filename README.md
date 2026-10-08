# Beatriz Ayade: Digital Portfolio

Crie o portfólio pessoal e acadêmico-profissional de Beatriz Ayade, estudante de Engenharia de Software focada em backend, IA, dados, cloud e pesquisa.

Diretrizes de Identidade Visual e Estética:
- Conceito: Uma fusão autoral entre digital scrapbook, editorial contemporâneo e personal web / early internet reinterpretada de forma sutil e sofisticada (sem paródias retrô ou temas kitsch de Windows 95/Mac OS).
- Paleta de Cores:
  * Base principal (off-white papel sulfite/offset): #FAF7F2
  * Superfície secundária (cards, caixas de código, abas): #F3EEE8
  * Tipografia e traços de estrutura: #181617 (preto/grafite profundo)
  * Rosa (cor principal de identidade e destaque): #E58FA3
  * Rosa suave (hover, fundos sutis): #F4C6CE
  * Rosa intenso (pequenos highlights, setas, destaques de clique): #C95773
  * Cores de acento pontuais (usadas de forma equilibrada e nunca todas juntas):
    - Azul suave: #AFC9D8
    - Lilás suave: #B9A9D1
    - Amarelo manteiga: #F1D47A
    - Coral suave: #E77B6B
  * O que EVITAR estritamente: fundos marrons, bege amarelado dominante, verde oliva, azul elétrico cobrindo a tela, neon e gradientes genéricos de SaaS.
- Tipografia e Elementos Gráficos:
  * Títulos editoriais com personalidade e presença gráfica.
  * Corpo de texto limpo, moderno e com excelente legibilidade.
  * Tipografia monospace refinada para dados técnicos, tags, arquitetura e snippets.
  * Anotações delicadas, setas desenhadas à mão, pequenos rabiscos, carimbos de status, timestamps, abas estilo browser e micro-terminais.

Estrutura de Páginas e Navegação:
1. Home (Prancheta Principal):
   * Header com navegação limpa (Início, Projetos, Mural, Contato/Sobre).
   * Hero autoral apresentando Beatriz Ayade, estudante de Engenharia de Software, suas áreas de pesquisa e links diretos para LinkedIn (https://www.linkedin.com/in/beatriz-ayade/) e GitHub (https://github.com/btrizayade).
   * Vitrine dos projetos principais (BookMind, Vox, Echo) com cards que equilibram proposta humana, stack técnica e botão para o case study.
   * Teaser visual convidativo levando para o Mural completo (/mural).
   * Rodapé com links e detalhes técnicos.

2. Páginas Dedicadas de Case Study (/projetos/bookmind, /projetos/vox, /projetos/echo):
   * Equilíbrio entre contexto, problema, solução, arquitetura de engenharia, stack e aprendizados.
   * Frames/áreas visuais diagramadas e reservadas com acabamento de scrapbook/editorial para receber futuramente screenshots, gravações, diagramas de arquitetura, métricas e trechos de código (sem inventar métricas ou dados falsos que ainda não existam).
   * Dados reais dos projetos:
     - BookMind: Plataforma de descoberta e análise de livros com IA. Busca e autocomplete, ranking por relevância, enriquecimento bibliográfico, AI Summary, Book DNA, Reading Profile e recomendações. Stack: React, TypeScript, Vite, CSS, Python, FastAPI, Uvicorn, PostgreSQL, SQLAlchemy, Alembic. Integrações: Google Books API, Open Library, Gemini. Arquitetura: frontend → FastAPI → PostgreSQL/APIs externas → processamento e IA → frontend. Links: Demo (https://book-mind-ashy.vercel.app/) e Repositório (https://github.com/btrizayade/BookMind).
     - Vox: Aplicação de comunicação assistiva voltada para pessoas que utilizam PECS/AAC, para organizar categorias e pictogramas. Categorias e pictogramas, busca, filtros, APIs REST, migrations e seed. Stack: Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic. Infra: PostgreSQL e Storage no Supabase para assets. Status: Em desenvolvimento. Repositório (https://github.com/btrizayade/Vox).
     - Echo: Sistema pessoal local-first para capturar, organizar e recuperar ideias no momento certo com busca semântica e priorização temporal. V0.1 focada em texto, embeddings, busca semântica, priorização temporal e registro de eventos de recuperação (RescueEvent). Stack: Python, FastAPI, SQLite, SQLAlchemy, Sentence Transformers, NumPy. Status: Em desenvolvimento. Repositório (https://github.com/btrizayade/Echo).

3. Página Exclusiva do Mural (/mural):
   * Estética de digital garden / personal web / scrapbook.
   * Blocos para: leituras atuais/livros recomendados, papers e artigos de IA/computação em estudo, stack tracker/tecnologias exploradas, e notas/pensamentos breves.

Construa uma aplicação fluida, responsiva e com transições suaves entre as páginas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/52bd787e-d045-47a6-bcb7-b2af4a4d63d3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
