# Beta Bot Hub

A self-contained, responsive website for Beta Bot Hub.

## Run locally

Open `index.html` in a browser, or run the same server used by Railway:

```bash
npm start
```

The server listens on the `PORT` supplied by the hosting provider and binds to
`0.0.0.0`, which is required by Railway. No packages need to be installed.

## Publish

Upload the contents of this folder to any static host such as Replit Deployments, Netlify, Vercel, GitHub Pages, or Cloudflare Pages.

For Railway, upload this folder as a Node service. Railway will detect
`package.json` and run `npm start` automatically.

The page includes:

- Typing welcome intro and loading animation
- Responsive glow-effect visual system
- Local hero image in `assets/hero-image.jpg`
- Expandable service cards with the related bot directory inside each card
- Local circular bot DPs in `assets/bots/`
- Music, Movie, Management + Game, and Session + Hack bot directories
- Direct links to all supplied Telegram bots, support, updates, owner, and movie website destinations
- Mobile layout and accessible tab navigation