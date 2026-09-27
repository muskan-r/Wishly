import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateBirthdayMessage = async ({
  name,
  relationship,
  traits,
}) => {
  const prompt = `
You are the writer behind a beautiful romantic birthday surprise website called Wishly.

Write a short, heartfelt birthday message for this person.

Person's name: ${name}
Relationship: ${relationship || "someone special"}
Things about them: ${traits}

Requirements:
- Write directly to the birthday person.
- Make it warm, personal, emotional and genuine.
- Naturally use the provided traits.
- Do not sound like an AI.
- Do not use emojis.
- Do not mention AI, prompts, or Wishly.
- Keep it between 45 and 70 words.
- Do not start with "Happy Birthday".
- Return only the message.
`;

  const fallback = `Wishing you the happiest birthday, ${name}. Here's to another year of being exactly, wonderfully you.`;

  // Retry temporary 503 errors with increasing delays
  const modelsToTry = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.5-flash"];
  for (const model of modelsToTry) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`${model} - attempt ${attempt}...`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const text = response.text?.trim();

      if (text) {
        console.log(`✨ Gemini generated message using ${model}`);
        return text;
      }
    } catch (err) {
      console.error(`${model} attempt ${attempt} failed:`, err.message);

      if (attempt < 2) {
        await sleep(3000);
      }
    }
  }
}

console.log("⚠️ All Gemini models unavailable. Using fallback.");
return fallback;
};