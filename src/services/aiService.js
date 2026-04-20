import axios from "axios";

const promptTemplates = {
  summary: (topic) => `Create a concise study summary for: ${topic}`,
  questions: (topic) => `Generate 10 practice questions with answers for: ${topic}`,
  flashcards: (topic) =>
    `Generate 12 flashcards for ${topic}. Use Q: and A: format for each card.`,
  custom: (text) => text,
};

export const generateAIResponse = async ({ prompt, mode = "custom" }) => {
  try {
    const provider = (import.meta.env.VITE_AI_PROVIDER || "gemini").toLowerCase();
    const apiKey = provider === "openai" ? import.meta.env.VITE_OPENAI_API_KEY : import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return "API key is not configured";
    }

    const finalPrompt = (promptTemplates[mode] || promptTemplates.custom)(prompt);
    let textResponse = "";

    if (provider === "openai") {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: finalPrompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      textResponse = res.data.choices?.[0]?.message?.content || "No response";
    } else {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: finalPrompt }] }],
        }
      );
      textResponse = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    }

    return textResponse;
  } catch (error) {
    const status = error.response?.status;
    if (status === 429) return "Rate limit exceeded. Please try again shortly.";
    if (status === 401) return "Authentication failed. Check your AI API key.";
    return "Something went wrong while generating AI content.";
  }
};