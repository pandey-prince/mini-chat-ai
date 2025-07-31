import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const prompt = req.body.prompt;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "API key not set" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const rawText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response.";

    const html = marked.parse(rawText);
    res.status(200).json({ reply: html });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
