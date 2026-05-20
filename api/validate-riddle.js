// Vercel Serverless Function: api/validate-riddle
// Reads correct answers from process.env.RIDDLES_ANSWERS_JSON (JSON string)
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { riddleId, guess, reveal } = req.body || {};
  if (typeof riddleId === "undefined" || typeof guess !== "string") {
    return res.status(400).json({ error: "riddleId and guess are required" });
  }

  const raw = process.env.RIDDLES_ANSWERS_JSON || "{}";
  let answers = {};
  try {
    answers = JSON.parse(raw);
    console.log("RIDDLE IDS FROM ENV:", Object.keys(answers));
    console.log("REQUESTED RIDDLE ID:", riddleId);
  } catch (err) {
    console.error("Invalid RIDDLES_ANSWERS_JSON:", err);
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const correct = answers[String(riddleId)];
  if (typeof correct === "undefined") {
    return res.status(404).json({ error: "Riddle not found" });
  }

  const normalizedGuess = String(guess).toLowerCase().trim();
  const normalizedCorrect = String(correct).toLowerCase().trim();
  const isCorrect = normalizedGuess === normalizedCorrect;

  const payload = { correct: isCorrect };
  if (!isCorrect && reveal) payload.correctAnswer = correct;

  return res.json(payload);
};
