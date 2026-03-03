import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AIChat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;

    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: userMessage }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const res = await API.post("/ai/chat", {
        message: userMessage
      });

      const aiReply =
        res.data.response ||
        res.data.reply ||
        res.data.message ||
        JSON.stringify(res.data);

      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: aiReply }
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "Error getting AI response." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout role="patient">
      <h1 style={{ marginBottom: "20px" }}>AI Health Assistant</h1>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          height: "500px",
          padding: "20px"
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "15px"
          }}
        >
          {chatHistory.length === 0 && (
            <p style={{ color: "gray" }}>Start chatting with AI...</p>
          )}

          {chatHistory.map((chat, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  chat.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px"
              }}
            >
              <div
                style={{
                  padding: "10px 15px",
                  borderRadius: "20px",
                  maxWidth: "70%",
                  backgroundColor:
                    chat.sender === "user" ? "#2563eb" : "#f1f5f9",
                  color:
                    chat.sender === "user" ? "white" : "#111827"
                }}
              >
                {chat.text}
              </div>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          style={{ display: "flex", gap: "10px" }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AIChat;