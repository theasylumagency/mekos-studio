# Meko’s Studio

Next.js App Router website for Meko’s Studio. The existing Georgian paths are `/`, `/art`, `/isolon`, `/formation`, and `/about`. The English pages use the same paths under `/en`. The language switch opens the matching page.

## Run locally

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` for Georgian or `http://localhost:3000/en` for English.

```sh
npm run lint
npm run build
npm start
```

## Edit content

- `src/lib/content.ts` contains the studio and portfolio copy in both languages.
- `src/lib/catalog.ts` contains the flower models, colour variants, flower references, and roll colours.
- `src/lib/site.ts` contains the domain, WhatsApp number, and email addresses. The enquiry forms open a draft in WhatsApp or in the visitor’s email app.
- `public/studio` holds the site’s images, fonts, logo, and the silent home-page loop (`hero-loop.mp4`, with `hero-poster.webp` as its still frame). App icons live in `src/app` (`favicon.ico`, `icon.png`, `apple-icon.png`).

The original backup remains under `old-site`. It includes a standalone PHP signage tool under `ad` which is separate from the studio site.
