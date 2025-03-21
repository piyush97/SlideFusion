"use server";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCreativePrompt = async (
  prompt: string,
): Promise<string> => {
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt,
    max_tokens: 100,
    temperature: 0.7,
  });

  return response.choices[0].text;
};
