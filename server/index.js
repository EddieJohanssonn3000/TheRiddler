const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple request logger to help debug incoming requests
app.use((req, res, next) => {
  console.log(`[server] ${req.method} ${req.originalUrl}`);
  next();
});

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const SECRETS_PATH = path.join(__dirname, "secrets", "riddles-answers.json");

function loadAnswers() {
  if (!fs.existsSync(SECRETS_PATH)) {
    console.warn("Riddle answers file not found:", SECRETS_PATH);
    return {};
  }

  try {
    const raw = fs.readFileSync(SECRETS_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read answers file:", err);
    return {};
  }
}

app.post("/api/validate-riddle", (req, res) => {
  const { riddleId, guess, reveal } = req.body || {};

  if (typeof riddleId === "undefined" || typeof guess !== "string") {
    return res.status(400).json({ error: "riddleId and guess are required" });
  }

  const answers = loadAnswers();
  const correct = answers[String(riddleId)];

  if (typeof correct === "undefined") {
    return res.status(404).json({ error: "Riddle not found" });
  }

  const normalizedGuess = String(guess).toLowerCase().trim();
  const normalizedCorrect = String(correct).toLowerCase().trim();

  const isCorrect = normalizedGuess === normalizedCorrect;

  const payload = { correct: isCorrect };
  if (!isCorrect && reveal) {
    payload.correctAnswer = correct;
  }

  res.json(payload);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
