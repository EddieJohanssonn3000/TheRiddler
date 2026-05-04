import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/riddle", (req, res) => {
  res.json({
    question: "What has keys but can't open locks?",
    answer: "piano",
    hint: "It's a musical instrument"
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});