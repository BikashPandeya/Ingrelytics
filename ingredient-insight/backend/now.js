import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
console.log(process.env.GEMINI_API_KEY)

const API_KEY = "AIzaSyBY6s9j09eebkmfa2bYI-_KKW6J-W2R2ng";
if (!API_KEY) throw new Error("GEMINI_API_KEY environment variable not set.");

const genAI = new GoogleGenAI({ apiKey: API_KEY });

app.get("/health", (req, res) => {
  res.json({ status: "Backend server is running" });
});

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No extracted text provided." });
    }

    const prompt = `
You are "IngredientInsight," an AI health and safety expert and food scientist.

Analyze this ingredient list carefully:
{
${text}
}

Return a single valid JSON object in this structure only:

{
  "transcribedText": string,
  "safetyScore": number,
  "summary": string,
  "harmfulIngredients": [
    { "name": string, "risk": "High"|"Moderate"|"Low"|"Unknown", "description": string }
  ],
  "healthierAlternatives": string[]
}

--- IMPORTANT RULES ---
1. The "safetyScore" must be between 0 and 10.
2. Use realistic food safety logic.
3. Be critical and honest.
4. Output ONLY valid JSON.
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const responseText = response.text || "";
    if (!responseText) {
      return res.status(500).json({ error: "Empty response from Gemini API" });
    }

    let report;
    try {
      report = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) report = JSON.parse(jsonMatch[0]);
      else return res.status(500).json({ error: "No valid JSON found in response" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: "Failed to analyze ingredients",
      details: String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
