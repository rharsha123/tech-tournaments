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

## GitHub Pages

The project is configured for:

`https://rharsha123.github.io/tech-tournaments/`

The Vite `base` is set to `/tech-tournaments/`, which is required for a repository/project Pages URL.

In GitHub:

1. Open **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push the project to the `main` branch.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys the site.

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

The next phase should move tournament data into structured files and then add a free database + protected admin UI so updates can be made without editing source code.

## Validation performed

- Repository checked: currently empty.
- GitHub Pages project-path requirement checked against current Vite documentation.
- Deployment workflow corrected so it does not require a missing `package-lock.json`.
- Vite `base` corrected for `/tech-tournaments/`.
- Broken Cricket/Badminton navigation anchors corrected.
