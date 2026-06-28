import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendToAI } from "./ai";
import { EMOTIONAL_TRANSLATOR_PROMPT } from "./prompts";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { canUseFeature, recordUsage, FREE_LIMITS } from "./usageLimits";

function EmotionalTranslator() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm here to help you explore what you're feeling. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    checkLimit();
  }, []);

  const checkLimit = async () => {
    setCheckingLimit(true);
    const user = auth.currentUser;
    if (!user) return;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const plan = userDoc.exists() ? userDoc.data().plan || "free" : "free";

    const result = await canUseFeature(user.uid, plan, "emotionalTranslator");
    setRemaining(result.remaining);
    setLimitReached(!result.allowed);
    setCheckingLimit(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading || limitReached) return;

    const user = auth.currentUser;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const aiReply = await sendToAI(EMOTIONAL_TRANSLATOR_PROMPT, updatedMessages);

    setMessages([...updatedMessages, { role: "assistant", content: aiReply }]);
    setLoading(false);

    await recordUsage(user.uid, "emotionalTranslator");
    await checkLimit();
  };

  return (
    <div
      className="sb-page"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <div className="sb-topbar">
        <button onClick={() => navigate("/")} className="sb-back">
          ← Back
        </button>
        <h2 className="sb-title" style={{ fontSize: "20px" }}>
          Emotional Translator
        </h2>
      </div>

      <p className="sb-subtitle" style={{ marginBottom: "4px" }}>
        This is a self-reflection tool, not therapy or medical advice.
      </p>

      {!checkingLimit && remaining !== null && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--color-teal)",
            margin: "0 0 14px 0",
            fontWeight: 600,
          }}
        >
          {remaining} message{remaining === 1 ? "" : "s"} left today on the Free plan
        </p>
      )}

      <div className="sb-chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`sb-bubble-row ${msg.role === "user" ? "user" : ""}`}>
            <span className={`sb-bubble ${msg.role}`}>{msg.content}</span>
          </div>
        ))}
        {loading && <div className="sb-typing">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {limitReached ? (
        <div className="sb-card-accent" style={{ textAlign: "center" }}>
          <p style={{ margin: "0 0 12px 0", fontWeight: "bold" }}>
            You've used today's {FREE_LIMITS.emotionalTranslator} free messages.
          </p>
          <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "var(--color-text-muted)" }}>
            Upgrade to Pro for unlimited conversations.
          </p>
          <button onClick={() => navigate("/")} className="sb-btn sb-btn-primary">
            Upgrade to Pro
          </button>
        </div>
      ) : (
        <form onSubmit={handleSend} className="sb-chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type how you're feeling..."
            className="sb-input"
          />
          <button type="submit" disabled={loading} className="sb-btn sb-btn-primary">
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default EmotionalTranslator;