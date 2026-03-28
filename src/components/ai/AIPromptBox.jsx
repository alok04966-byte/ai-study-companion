import { useState } from "react";
import { generateAIResponse } from "../../services/aiService";

function AIPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    const result = await generateAIResponse(prompt);
    setResponse(result);
  };

  return (
    <div>
      <h2>AI Assistant</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "100%", height: "100px" }}
      />

      <button onClick={handleGenerate}>Generate</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default AIPromptBox;