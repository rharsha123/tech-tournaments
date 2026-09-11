# Tech Tournaments

A responsive React/Vite tournament website for cricket and badminton.

## GitHub repository

`rharsha123/tech-tournaments`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
```

The production site is generated in `dist/`.

## GitHub Pages

The project is configured for:

`https://rharsha123.github.io/tech-tournaments/`

The Vite `base` is set to `/tech-tournaments/`, which is required for a repository/project Pages URL.

In GitHub:

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push the project to the **master** branch.
4. The workflow in `.github/workflows/deploy.yml` builds the Vite application and deploys `dist/`.

## Current features

- Cricket and badminton navigation
- Daily fixtures
- Match results
- Cricket points table
- Qualifier/knockout section
- Photo/video gallery placeholders
- Responsive mobile layout
- GitHub Actions deployment
- Generic green/gold tournament visual theme

## Important

This version is static. Fixtures, scores, standings and gallery content are currently sample data in `src/main.jsx`.

The next phase can move tournament data into structured files and add a free database + protected admin UI so updates can be made without editing source code.
