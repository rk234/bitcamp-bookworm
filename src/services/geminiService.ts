import { GoogleGenAI } from "@google/genai";

export async function sendPromptToGemini(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is not defined in the environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  // Uncomment the following code to include markdown context as part of the prompt for retrieval‐augmented generation (RAG)
  /*
  const context = markdown && markdown.trim().length > 0
    ? `Context from markdown:\n${markdown.trim()}\n\n`
    : "";
  const combinedPrompt = context + prompt;
  */

  // For now, we are simply using the prompt without additional context.
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