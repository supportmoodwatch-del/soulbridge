import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendToAI } from "./ai";
import { INTIMACY_LAB_SCENARIOS, getIntimacyLabPrompt } from "./prompts";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { canUseFeature, recordUsage, FREE_LIMITS } from "./usageLimits";

function IntimacyLab() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [messages, setMessages] = useState([]);
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

    const result = await canUseFeature(user.uid, plan, "intimacyLab");
    setRemaining(result.remaining);
    setLimitReached(!result.allowed);
    setCheckingLimit(false);
  };

  const startScenario = async (scenario) => {
    if (limitReached) return;

    setSelectedScenario(scenario);
    setMessages([]);
    setLoading(true);

    const user = auth.currentUser;
    const systemPrompt = getIntimacyLabPrompt(scenario.title);
    const aiOpening = await sendToAI(systemPrompt, []);

    setMessages([{ role: "assistant", content: aiOpening }]);
    setLoading(false);

    await recordUsage(user.uid, "intimacyLab");
    await checkLimit();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading || !selectedScenario || limitReached) return;

    const user = auth.currentUser;
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const systemPrompt = getIntimacyLabPrompt(selectedScenario.title);
    const aiReply = await sendToAI(systemPrompt, updatedMessages);

    setMessages([...updatedMessages, { role: "assistant", content: aiReply }]);
    setLoading(false);

    await recordUsage(user.uid, "intimacyLab");
    await checkLimit();
  };

  const backToScenarios = () => {
    setSelectedScenario(null);
    setMessages([]);
  };

  // Screen 1: Scenario picker
  if (!selectedScenario) {
    return (
      <div className="sb-page">
        <div className="sb-topbar">
          <button onClick={() => navigate("/")} className="sb-back">
            ← Back
          </button>
          <h2 className="sb-title" style={{ fontSize: "20px" }}>
            Intimacy Lab
          </h2>
        </div>

        <p className="sb-subtitle" style={{ marginBottom: "4px" }}>
          Practice difficult conversations in a safe space. Choose a scenario to begin.
        </p>

        {!checkingLimit && remaining !== null && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--color-teal)",
              margin: "0 0 20px 0",
              fontWeight: 600,
            }}
          >
            {remaining} message{remaining === 1 ? "" : "s"} left today on the Free plan
          </p>
        )}

        {limitReached && (
          <div className="sb-card-accent" style={{ textAlign: "center", marginBottom: "20px" }}>
            <p style={{ margin: "0 0 12px 0", fontWeight: "bold" }}>
              You've used today's {FREE_LIMITS.intimacyLab} free messages.
            </p>
            <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "var(--color-text-muted)" }}>
              Upgrade to Pro for unlimited practice sessions.
            </p>
            <button onClick={() => navigate("/")} className="sb-btn sb-btn-primary">
              Upgrade to Pro
            </button>
          </div>
        )}

        {INTIMACY_LAB_SCENARIOS.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => startScenario(scenario)}
            className="sb-scenario-card"
            style={{
              cursor: limitReached ? "not-allowed" : "pointer",
              opacity: limitReached ? 0.5 : 1,
            }}
          >
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
          </div>
        ))}
      </div>
    );
  }

  // Screen 2: Roleplay chat
  return (
    <div
      className="sb-page"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <div className="sb-topbar">
        <button onClick={backToScenarios} className="sb-back">
          ← Back
        </button>
        <h2 className="sb-title" style={{ fontSize: "20px" }}>
          {selectedScenario.title}
        </h2>
      </div>

      <p className="sb-subtitle" style={{ marginBottom: "14px" }}>
        This is a roleplay practice exercise, not a real conversation.
      </p>

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
            You've used today's {FREE_LIMITS.intimacyLab} free messages.
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
            placeholder="Type your response..."
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

export default IntimacyLab;