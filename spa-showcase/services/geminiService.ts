import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_PROMPT } from '../constants';

// Initialize Gemini client
// Note: In a real production environment, ensure process.env.API_KEY is set.
// For this demo, we assume the environment is set up correctly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhanceDescription = async (roughText: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key found for Gemini");
    return "API Key missing. Please configure your environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Rewrite this project description to be professional and catchy: "${roughText}"`,
      config: {
        systemInstruction: GEMINI_SYSTEM_PROMPT,
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    return response.text?.trim() || roughText;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return roughText;
  }
};