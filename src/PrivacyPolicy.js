import React from "react";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="sb-page" style={{ lineHeight: "1.65" }}>
      <button onClick={() => navigate(-1)} className="sb-back" style={{ marginBottom: "20px" }}>
        ← Back
      </button>

      <h1 className="sb-title">Privacy Policy</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>Last updated: June 2026</p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>What SoulBridge Is</h2>
      <p>
        SoulBridge is a self-improvement and communication-practice tool. It is
        NOT a therapy service, NOT a medical service, and NOT a substitute for
        professional mental health care.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>Information We Collect</h2>
      <p>
        When you create an account, we collect your email address. When you
        use our features (Emotional Translator, Intimacy Lab, Daily Connection
        Capsule), your conversation content is sent to our AI provider
        (OpenRouter) to generate responses, and may be stored in our database
        to let you continue using the app.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>How We Use Your Information</h2>
      <p>
        We use your information only to operate the app: to let you log in,
        to generate AI responses, and to save your progress (such as your
        daily task history). We do not sell your personal information.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>Data Storage</h2>
      <p>
        Your data is stored using Google Firebase (Firestore database) and
        protected by access rules that only allow you to access your own data.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>Your Rights</h2>
      <p>
        If you are located in the European Union (GDPR) or California (CCPA),
        you have the right to access, correct, or delete your personal data.
        You can delete your account and associated data at any time from your
        account settings.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>Crisis Situations</h2>
      <p>
        SoulBridge's AI features are not equipped to handle emergencies. If
        you are experiencing a mental health crisis or having thoughts of
        self-harm, please contact emergency services or a crisis helpline
        immediately (in the US: call or text 988; in the UK: call 116 123).
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>Contact</h2>
      <p>
        If you have questions about this Privacy Policy or your data, please
        contact us through the app.
      </p>
    </div>
  );
}

export default PrivacyPolicy;