# TheRiddler

This project includes a Vercel API route for riddle validation and an optional local Express server for development.

To run the client:

````
cd client
npm install
npm run dev

Deploying everything to Vercel (recommended)
--------------------------------------------

This project is set up so you can deploy both the frontend and the small validation API as one Vercel project.

What we did
- Added a serverless function at `/api/validate-riddle` that validates riddle answers on the server side.
- The correct answers are stored in a Vercel Environment Variable `RIDDLES_ANSWERS_JSON` (a JSON string). This keeps answers out of the client bundle and the git repo.
- Added a root-level `vercel.json` so Vercel can build the client from `client/` and still expose the API from repo root.

Quick deploy steps
1. Push the repository to your Git provider (GitHub/GitLab).
2. In Vercel, create a new project from the repo.
3. In the Project Settings → Environment Variables, add `RIDDLES_ANSWERS_JSON` with a JSON value like:
	 {"7":"clock","8":"towel","9":"needle","10":"age"}
4. Deploy. The serverless function will be available at `https://<your-project>.vercel.app/api/validate-riddle` and the frontend can call `/api/validate-riddle` relatively.

Important
- The recommended setup is to keep the Vercel project root at the repository root and let `vercel.json` handle the client build.
- The top-level `api/validate-riddle.js` is the function Vercel should deploy in that setup.

Local development
-----------------
- Option A (recommended for parity with Vercel): install Vercel CLI and run `vercel dev` from the repo root. Copy `.env.example` to `.env` and add your answers there.

	```bash
	npm i -g vercel
	cp .env.example .env
	# edit .env to include your answers
	vercel dev
	```

- Option B (existing workflow): You can continue using the local Express server under `/server` for development, and the client is already configured with a Vite proxy to forward `/api` to `http://localhost:4000`.

Security note
- Do NOT commit any real `server/secrets/riddles-answers.json` or local `.env` files. Use `server/.gitignore` and the project `.gitignore` to exclude secrets. Use Vercel Environment Variables for production secrets.

````
