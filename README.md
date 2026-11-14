![Ricklepedia](public/logogit.png)

A fan-made index of Rick and Morty characters and episodes.

Live at [ricklepedia.eftekin.com](https://ricklepedia.eftekin.com).

## Features

- Search all 826 characters by name, and filter by status, species and gender
- A page for each character with their details and every episode they appear in
- All 51 episodes grouped by season, each with its cast
- Favorites, kept in your browser
- A random character link

Data comes from the [Rick and Morty API](https://rickandmortyapi.com), which covers seasons 1 to 5.

## Stack

- Next.js 16 (App Router) and TypeScript
- Plain CSS with design tokens in `app/globals.css`
- Deployed on Vercel

## Running locally

```bash
git clone https://github.com/eftekin/Ricklepedia.git
cd Ricklepedia
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

## License

MIT, see [LICENSE](LICENSE).
