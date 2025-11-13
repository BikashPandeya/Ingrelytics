export interface HarmfulIngredient {
  name: string;
  risk: "High" | "Moderate" | "Low" | "Unknown";
  description: string;
}

export interface AnalysisReport {
  transcribedText: string;
  safetyScore: number;
  summary: string;
  harmfulIngredients: HarmfulIngredient[];
  healthierAlternatives: string[];
}
