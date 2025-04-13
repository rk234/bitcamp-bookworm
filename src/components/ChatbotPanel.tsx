import { useState } from "react";
import { Resizable } from "re-resizable";
import { sendPromptToGemini } from "../services/geminiService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";
import Markdown from "react-markdown";

const ChatbotPanel = () => {
  // Chatbot states
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { prompt: string; response: string }[]
  >([]);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    try {
      const reply = await sendPromptToGemini(prompt);
      setChatHistory((prev) => [...prev, { prompt, response: reply }]);
      setPrompt("");
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setChatHistory((prev) => [
        ...prev,
        { prompt, response: "Error: Unable to fetch response." },
      ]);
    }
  };

  return (
    // Fixed positioning so this panel stays at the bottom-right of the viewport.
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 10000 }}>
      <Resizable
        defaultSize={{ width: 320, height: window.innerHeight / 2 }}
        minWidth={200}
        minHeight={150}
      >
        <div
          style={{
            backgroundColor: "#1F2937",
            color: "#F9FAFB",
            padding: "1rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--muted)",
            borderRadius: "4px",
            width: "100%",
            height: "100%",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              cursor: "default",
            }}
          >
            <h2 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
              Gemini AI Chatbot
            </h2>
          </div>

          {/* Chat History */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              backgroundColor: "#374151",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              marginBottom: "1rem",
            }}
          >
            {chatHistory.map((chat, idx) => (
              <div key={idx} style={{ marginBottom: "0.75rem" }}>
                <p
                  style={{
                    margin: "0.5rem 0",
                    fontSize: "0.875rem",
                    color: "#D1D5DB",
                  }}
                >
                  <strong>You:</strong> {chat.prompt}
                </p>
                <p
                  style={{
                    margin: "0.5rem 0",
                    fontSize: "0.875rem",
                    color: "#E5E7EB",
                  }}
                >
                  <strong>Gemini:</strong> <Markdown>{chat.response}</Markdown>
                </p>
              </div>
            ))}
          </div>

          {/* Prompt Input */}
          <div className="flex">
            <Input
              placeholder="Ask Gemini something..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-2 mr-2"
            />
            <Button onClick={handleSendPrompt} variant="outline">
              <ArrowRight></ArrowRight>
            </Button>
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default ChatbotPanel;
