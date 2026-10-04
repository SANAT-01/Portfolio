# Sanat Tudu — Portfolio App

Personal portfolio site built with Next.js. It showcases my experience, skills and projects, and has a contact form that sends email through EmailJS.

## Tech stack 

- [Next.js](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 3
- [EmailJS](https://www.emailjs.com/) for the contact form
- [react-icons](https://react-icons.github.io/react-icons/)
- Docker + Jenkins for build and deployment

## Project structure

```
src/
├── app/            # layout, page, global styles, tab icon
├── components/     # Hero, About, Skills, Experience, Projects, Contact, ...
├── data/
│   └── portfolio.ts  # all site content (profile, skills, experience, projects, socials)
└── utils/          # small helpers
public/assets/      # profile picture and skill icons
```

All content lives in [src/data/portfolio.ts](src/data/portfolio.ts). To update the site, edit that file — the components read everything from there.

- **Add a skill:** drop an icon in `public/assets/skills/` and add an entry to `skills`.
- **Add a resume:** put a PDF in `public/` and set `profile.resumeUrl`, e.g. `"/resume.pdf"`.

### Projects

The Projects section ([src/components/Projects.tsx](src/components/Projects.tsx)) fetches
`githubUsername`'s repositories live from the GitHub REST API at request time
(server-side, via [src/lib/github.ts](src/lib/github.ts)), sorts them by star
count, and shows the top 6 — with language, stars, description and links
pulled straight from GitHub. The response is cached for an hour
(`next: { revalidate: 3600 }`), so it isn't refetched on every visit.

- **Change whose repos are shown:** edit `githubUsername` in `portfolio.ts`.
- **Change how many are shown / the ranking:** edit the `getTopRepos(username, 6)`
  call in `Projects.tsx`, or the sort in `getTopRepos`.
- If the GitHub API is unreachable or rate-limited, the section falls back to
  the static `projects` array in `portfolio.ts` — edit that as a backup.

**Cover photos:** by default every project card shows a plain numbered
cover, not a photo — consistent, and nothing to maintain. To put a real
screenshot on a specific project instead:

1. Drop the image in `public/assets/projects/` (e.g. `my-repo.png`).
2. Add it to `projectImages` in `portfolio.ts`, keyed by the repo's name
   exactly as it appears in its GitHub URL:
   ```ts
   export const projectImages: Record<string, string> = {
     "Rate-Limiter": "/assets/projects/rate-limiter.png",
   };
   ```
   A full `https://` URL works there too, if you'd rather host the image
   elsewhere.

For the static fallback `projects` array, set `image` directly on each
entry the same way (a `/public` path or a URL). If an image fails to load,
the card quietly falls back to the plain numbered cover — nothing breaks.

(Earlier versions defaulted to GitHub's auto-generated social preview image
for every repo — dropped because that image embeds your profile photo, so
every card ended up showing the same picture of you.)

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the EmailJS values (optional)
npm run dev                  # http://localhost:3000
```

| Script          | What it does                    |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Create a production build       |
| `npm start`     | Serve the production build      |
| `npm run lint`  | Run the linter                  |

## Environment variables

| Variable                           | Description                    |
| ---------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`   | EmailJS service ID             |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`  | EmailJS template ID            |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`   | EmailJS public key             |
| `GITHUB_TOKEN`                     | Optional — raises the GitHub API rate limit for the Projects section (see below) |

Get the EmailJS values from your [EmailJS](https://www.emailjs.com/) account. If they aren't set, the contact form falls back to opening the visitor's mail app.

`NEXT_PUBLIC_*` values are inlined into the JavaScript bundle **at build time**, so changing them requires a rebuild. `GITHUB_TOKEN` is read server-side only (at request time, not build time), so it's never shipped to the browser.

Unauthenticated GitHub API requests are capped at 60/hour per IP, shared across every visitor hitting the server — fine for personal use given the hourly cache, but if the Projects section ever shows the fallback projects unexpectedly, you likely hit that limit. Set `GITHUB_TOKEN` to a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) with no scopes (public read access only) to raise it to 5,000/hour.

## Docker

The [Dockerfile](Dockerfile) is a multi-stage build that uses Next.js `output: "standalone"` to produce a small production image (the container runs `node server.js`).

```bash
cp .env.example .env            # Compose reads .env (not .env.local)
docker compose up -d --build
```

The app is served on host port **24817** by default (mapped to port 3000 inside the container). To use a different port, set `HOST_PORT` in `.env`. The EmailJS variables above are passed to the image as build args; `GITHUB_TOKEN` (optional) is passed as a container runtime environment variable instead, since it's only ever read server-side.

```bash
docker compose logs -f          # follow logs
docker compose down             # stop and remove the container
```

## CI/CD

The [Jenkinsfile](Jenkinsfile) deploys to a VPS on every run:

1. **Checkout** — pull the repository.
2. **Build Image** — `docker build` the image, passing the EmailJS build args.
3. **Deploy** — `docker compose up -d --force-recreate`.
4. **Health Check** — `curl` the deployed URL (`DEPLOY_URL`), retrying for about 30 seconds.

On failure the pipeline prints `docker compose ps` and the recent container logs. To enable the contact form in deployed builds, uncomment the `environment` credentials in the Jenkinsfile and create matching credentials in Jenkins (`emailjs-service-id`, `emailjs-template-id`, `emailjs-public-key`).

## Contact

- Email: [sanat.tudu.tech@gmail.com](mailto:sanat.tudu.tech@gmail.com)
- GitHub: [SANAT-01](https://github.com/SANAT-01)
- LinkedIn: [sanat-tudu](https://www.linkedin.com/in/sanat-tudu/)
