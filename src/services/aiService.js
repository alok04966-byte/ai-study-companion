import axios from "axios";

export const generateAIResponse = async (prompt) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return "Something went wrong";
  }
};