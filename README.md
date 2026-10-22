# Pretty Average Software

Public identity site. Next.js 16, React 19, TypeScript. Statically rendered server components; SVG artwork and CSS motion; locally bundled fonts. No database, auth, analytics, or CMS.

## Local development

Use Node 24 (`.nvmrc`). `npm ci`, then `npm run dev`. Check with `npm run lint`, `npm run typecheck`, and `npm run build`.

## Deployment

Production publication and DNS changes require explicit approval from the owner. See [deployment setup](docs/deployment.md).

## Assets

`public/brand` contains editable vector originals. SVG + CSS is used instead of GIF for small, resolution-independent assets. See [design direction](docs/design.md).

The public site is one page: About, Who we are, and Contact. Legacy routes redirect to homepage sections.
