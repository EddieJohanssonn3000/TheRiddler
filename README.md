# The Riddler

The Riddler is an escape-room style web game built with React, TypeScript, Vite, and a small Node/Express backend. A player enters their name, moves through a lobby, unlocks one of three doors, solves riddles, and can earn a final payout once all doors have been completed.

## What The Game Does

The flow is intentionally simple:

1. The player lands on a loading screen and is forwarded to the home page.
2. The player enters a name and continues to the lobby.
3. In the lobby, the player enters the escape room and chooses between three doors.
4. Each door costs money to unlock and leads to a riddle with three attempts.
5. Solving a riddle unlocks that door. When all three difficulty levels are solved, the game triggers the final payout of €5.

The app stores short-lived game state in `sessionStorage`, including the player name, identity token, unlocked doors, transaction id, stamp image, and payout flags.

## Project Structure

- `client/` - React frontend for the game
- `server/` - local Express server with `/api/health` and `/api/validate-riddle`
- `api/` - Vercel serverless function for riddle validation in production
- `vercel.json` - Vercel build, routing, and rewrite configuration

## Frontend Overview

The client is a routed single-page app with these main screens:

- `/` - loading screen
- `/home` - name entry screen
- `/lobby` - game intro and entry point to the room
- `/escaperoom` - door selection and payment flow
- `/riddle/:difficulty` - riddle solving view for easy, medium, or hard

The escape room has three doors:

- Easy door costs 3€
- Medium door costs 2€
- Hard door costs 1€

Each difficulty has several riddles, and one riddle is chosen at random when the route loads. Players can request a hint, but they only get three attempts before the riddle is failed and the correct answer is revealed.

The app also integrates with a Centralbank API for creating a transaction when a door is unlocked and for issuing the final payout when all doors are solved.

## Backend Overview

There are two validation implementations in the repository:

- `server/index.js` runs locally with Express and reads answers from `server/secrets/riddles-answers.json`
- `api/validate-riddle.js` is the Vercel serverless function and reads answers from the `RIDDLES_ANSWERS_JSON` environment variable

Both endpoints accept `POST` requests with `riddleId` and `guess`, and optionally `reveal: true` to return the correct answer after the player runs out of attempts.

## Mock Data And Local Data

- `VITE_USE_MOCK_BANK=true` turns on mock Centralbank responses in the frontend. This is useful for local development when you do not want to call the real bank API.
- `server/secrets/riddles-answers.json` contains the local answer map used by the Express server.
- The real riddles answers, API keys, and other private values should stay out of the README and version control.

## Requirements

- Node.js
- npm

## Local Development

## Clone the repository

- git clone https://github.com/EddieJohanssonn3000/TheRiddler.git

### Client

```bash
cd client
npm install
npm run dev
```

### Local API server

```bash
cd server
npm install
npm start
```

The client dev server is configured to proxy `/api` requests to `http://localhost:4000`.

### Optional Vercel-style local run

If you want to test the Vercel rewrites and serverless function locally, run:

```bash
npm i -g vercel
vercel dev
```

## Available Scripts

### Client scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

### Server scripts

- `npm start` - start the Express server
- `npm run dev` - start the Express server with nodemon

## Environment Variables

Create a local `.env` file from `.env.example` when needed.

```bash
VITE_CENTRALBANK_API_URL=https://api.loopland.se
VITE_CENTRALBANK_API_KEY=your-centralbank-api-key
VITE_USE_MOCK_BANK=false
RIDDLES_ANSWERS_JSON={"7":"<answer>","8":"<answer>","9":"<answer>"}
```

- `VITE_CENTRALBANK_API_URL` sets the Centralbank API base URL used by the frontend.
- `VITE_CENTRALBANK_API_KEY` is sent when creating transactions and payouts.
- `VITE_USE_MOCK_BANK=true` bypasses the real Centralbank API during local development.
- `RIDDLES_ANSWERS_JSON` contains the answer map used by the Vercel riddle validator. Keep the real values out of the README and out of version control.

## Deploying To Vercel

1. Push the repository to your Git provider.
2. Import the repository into Vercel and keep the project root at the repository root.
3. Add the environment variables above for Production and Preview.
4. Redeploy after changing any environment variable.

The production answer validator will be available at `/api/validate-riddle`.

## Accessibility Notes

The game is built around standard buttons, inputs, and modal dialogs so the main flow can be completed with keyboard navigation. Buttons and tap targets are sized for mobile use, and the UI gives feedback through hints, attempt counters, validation messages, and the final answer reveal after game over.

## Notes

- Do not commit local secret files or private environment files.
- The riddle answer values in this repository are intentionally stored outside the frontend bundle and should remain private in real deployments.

## Authors

Eddie Johansson and Daniella Saadon