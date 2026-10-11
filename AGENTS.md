<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Shared portfolio navigation and footer are mounted in the root around Outlet so all content pages share consistent navigation.
- Store project facts and metadata helpers in src/data/projects.ts so cards and case studies use one truthful source.
- Use /projetos as an Outlet layout, its index as the listing, and /projetos/$slug as the case-study leaf so every case mounts correctly.
- Keep /mural as the editorial trajectory page without persistence, with updateable academic content in src/data/trajectory.ts and project links sourced from src/data/projects.ts to avoid duplicating case studies.
- Define visual roles in src/styles.css and use semantic tokens throughout to keep the identity consistent.
