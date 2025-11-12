import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/app/lib/gemini";
import { analysisPrompt } from "@/app/lib/prompt";
import { AnalysisReport } from "@/app/lib/types";


async function fileToGenerativePart(file: File) {
  const base64EncodedData = Buffer.from(await file.arrayBuffer()).toString(
    "base64"
  );
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 });
    }

    const imagePart = await fileToGenerativePart(imageFile);


    const result = await geminiModel.generateContent([analysisPrompt, imagePart]);
    const responseText = result.response.text();

    let report: AnalysisReport;
    try {

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON object found in AI response.");
      }
      
      report = JSON.parse(jsonMatch[0]);

    } catch (e: any) {
      console.error("Failed to parse Gemini response:", responseText);
      console.error("Parse Error:", e.message);
      return NextResponse.json(
        { error: "AI failed to generate a valid report. The response was not valid JSON." },
        { status: 500 }
      );
    }

    return NextResponse.json(report);
  } catch (error: any) {
    console.error("Error in /api/analyze:", error.message);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
