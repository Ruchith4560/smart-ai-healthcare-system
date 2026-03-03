import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const res = await API.post("/ai/chat", { message });

    setChat([
      ...chat,
      { sender: "user", text: message },
      { sender: "bot", text: res.data.bot_reply }
    ]);

    setMessage("");
  };

  return (
    <Layout>
      <div className="card max-w-3xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">
          AI Healthcare Assistant
        </h2>

        <div className="h-96 overflow-y-auto border rounded-lg p-4 mb-4 bg-slate-50 space-y-4">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-white shadow"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your symptoms..."
            className="input-field"
          />
          <button onClick={sendMessage} className="btn-primary">
            Send
          </button>
        </div>

      </div>
    </Layout>
  );
}

export default AIChat;