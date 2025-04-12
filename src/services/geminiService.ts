import { GoogleGenAI } from "@google/genai";

export async function sendPromptToGemini(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not defined in the environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text || "No response received.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error: Unable to fetch response.";
  }
}