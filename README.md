# TheRiddler

This project contains the Tivoli frontend, the riddle game, and a small Vercel serverless function for validating riddle answers.

## Vercel Environment Variables

Add these in your Vercel project settings for **Production** and **Preview**:

```bash
VITE_CENTRALBANK_API_URL=https://api.loopland.se
VITE_CENTRALBANK_API_KEY=2396dc2d-15f4-4135-b2de-485c5c283256
RIDDLES_ANSWERS_JSON={"7":"clock","8":"towel","9":"needle","10":"age","11":"table","12":"hole","13":"stamp","14":"keyboard","15":"m","16":"comb","17":"fire","18":"coffin","19":"battery","20":"darkness","21":"ton"}
```

### What each variable is for

- `VITE_CENTRALBANK_API_URL`: the new Centralbank API base URL.
- `VITE_CENTRALBANK_API_KEY`: API key used by the amusement when creating transactions and payouts.
- `RIDDLES_ANSWERS_JSON`: JSON string used by the serverless riddle validator at `/api/validate-riddle`.

## Deploying to Vercel

1. Push the repository to your Git provider.
2. Create or open the Vercel project from the repository.
3. Make sure the project root is the repository root so `vercel.json` can build the frontend and expose `/api/validate-riddle`.
4. Add the environment variables above.
5. Redeploy after any env changes.

The riddle validator will be available at:

```bash
https://<your-project>.vercel.app/api/validate-riddle
```

## Local development

### Client

```bash
cd client
npm install
npm run dev
```

### Optional Vercel-style local run

```bash
npm i -g vercel
vercel dev
```

## Notes

- Do not commit local secret files or private environment files.
- `VITE_USE_MOCK_BANK=true` can be used locally if you want to bypass the real bank during development, but it should not be enabled in production.

## A11y requirements

We have considered accessibility by making the main interactions possible through buttons and form elements, which support keyboard navigation. Interactive elements such as doors, modal buttons, hints and answer submission can be reached and used without a mouse.

We have also worked with clear target sizes for buttons and clickable areas, especially on mobile, to make the game easier to use.

To support the user when entering answers, the game provides placeholder text, hints, feedback after incorrect answers and the correct answer after game over.