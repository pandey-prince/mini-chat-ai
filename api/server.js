const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const marked = require("marked");

const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

   const result = await model.generateContent(prompt);
   const rawText =
     result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
     "No response.";
   const html = marked.parse(rawText); // Convert Markdown to HTML
   res.json({ reply: html });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
