import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Key
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBY6s9j09eebkmfa2bYI-_KKW6J-W2R2ng";

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: API_KEY });

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Backend server is running" });
});

// Analyze ingredients endpoint
app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No extracted text provided." });
    }

    const prompt = `
You are "IngredientInsight," an AI health and safety expert.

Analyze this ingredient list:
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

No extra explanations, markdown, or text. Just JSON.
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    const responseText = response.text || "";

    if (!responseText) {
      return res.status(500).json({ error: "Empty response from Gemini API" });
    }

    // Try to parse JSON
    let report;
    try {
      report = JSON.parse(responseText);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        report = JSON.parse(jsonMatch[0]);
      } else {
        return res.status(500).json({ error: "No valid JSON found in response" });
      }
    }

    res.json(report);
  } catch (error) {
    console.error("Error in /analyze:", error);
    res.status(500).json({
      error: "Failed to analyze ingredients",
      details: String(error)
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
  console.log(`📍 POST /analyze - Analyze ingredient text`);
  console.log(`📍 GET /health - Health check`);
});