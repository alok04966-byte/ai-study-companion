import { useState } from "react";
import { generateAIResponse } from "../../services/aiService";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function AIPromptBox() {
  const MotionDiv = motion.div;
  const [prompt, setPrompt] = useState("");
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState("summary");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const finalPrompt = mode === "custom" ? prompt : topic;
    if (!finalPrompt.trim()) {
      setError("Please enter a topic or prompt first.");
      return;
    }

    setError("");
    setIsLoading(true);
    const result = await generateAIResponse({ prompt: finalPrompt, mode });
    setResponse(result);
    setHistory((prev) => [{ mode, prompt: finalPrompt, response: result }, ...prev].slice(0, 5));
    setIsLoading(false);
  };

  const handleCopy = async () => {
    if (!response) return;
    await navigator.clipboard.writeText(response);
    toast.success("Response copied");
  };

  const responseBlocks = response ? response.split(/\n\s*\n/g) : [];

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>AI Assistant</h2>
      <div className="panel form-grid">
        <div className="field field-full">
          <label>Mode</label>
          <div className="tabs-wrap">
            {[
              { id: "summary", label: "Summary" },
              { id: "questions", label: "Questions" },
              { id: "flashcards", label: "Flashcards" },
              { id: "custom", label: "Custom" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`btn ${mode === item.id ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {mode === "custom" ? (
          <div className="field field-full">
            <label>Prompt</label>
            <textarea
              className="textarea"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything..."
              rows={6}
            />
          </div>
        ) : (
          <div className="field field-full">
            <label>Topic</label>
            <input
              className="input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Binary Search Trees"
            />
          </div>
        )}

        <div className="field">
          <label>&nbsp;</label>
          <button className="btn btn-primary" onClick={handleGenerate} disabled={isLoading} type="button">
            {isLoading ? <span className="spinner" /> : "Generate"}
          </button>
        </div>
      </div>

      {error && <p className="badge badge-priority-high">{error}</p>}

      <div>
        <h3>Response:</h3>
        <div className="ai-response ai-scroll">
          {responseBlocks.length === 0 ? (
            "Generate a response to see output here."
          ) : (
            responseBlocks.map((block, index) => (
              <div key={index} className="ai-block">
                {block}
              </div>
            ))
          )}
        </div>
        <div className="tabs-wrap mt-20">
          <button type="button" className="btn btn-secondary" onClick={handleCopy} disabled={!response}>
            Copy
          </button>
        </div>
      </div>

      {history.length > 0 && (
        <div className="mt-20">
          <h3>Recent AI History</h3>
          {history.map((item, index) => (
            <div key={`${item.prompt}-${index}`} className="panel revision-card">
              <strong>{item.mode}</strong>
              <p>{item.prompt}</p>
            </div>
          ))}
        </div>
      )}
    </MotionDiv>
  );
}

export default AIPromptBox;