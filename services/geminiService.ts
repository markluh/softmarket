
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a marketing description for a piece of software using the Gemini API.
 * @param softwareName The name of the software.
 * @param keywords A string of comma-separated keywords describing the software.
 * @returns A promise that resolves to the generated description string.
 */
export const generateDescription = async (softwareName: string, keywords: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    throw new Error("API_KEY environment variable not set. Please configure it to use the AI feature.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Generate a compelling, short marketing description for a software product.
    The description should be engaging, around 25-30 words, and highlight the key features.
    Do not use markdown or any special formatting. Just return plain text.

    Software Name: "${softwareName}"
    Key Features/Keywords: "${keywords}"

    Description:
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    // Using the .text property for direct text extraction
    const text = response.text.trim();

    if (!text) {
        throw new Error("Received an empty response from the API.");
    }
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate description from Gemini API.");
  }
};