//
import { GoogleGenAI } from "@google/genai";

export async function runChat(prompt: string) {
  try {
    console.log("runChat called with prompt:", prompt);

    const ai = new GoogleGenAI({
      apiKey: "AIzaSyCSzlG909QSWe1ZMmDzTdRxaa3sZxr7EpA", // ideally use env vars for production
    });

    const config = {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      responseMimeType: "text/plain",
    };

    const model = "gemini-2.5-flash";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = "";

    for await (const chunk of response) {
      console.log("Received chunk:", chunk.text);
      fullText += chunk.text;
    }

    console.log("Full response:", fullText);

    return fullText;
  } catch (error) {
    console.error("Error inside runChat:", error);
    throw error; // re-throw so caller can handle or log further
  }
}
