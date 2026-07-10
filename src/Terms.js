import React from "react";
import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="sb-page" style={{ lineHeight: "1.65", maxWidth: "700px" }}>
      <button onClick={() => navigate(-1)} className="sb-back" style={{ marginBottom: "20px" }}>
        ← Back
      </button>

      <h1 className="sb-title">Terms of Service</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>Last updated: July 2026</p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>1. About SoulBridge</h2>
      <p>
        SoulBridge is a self-improvement and communication-practice tool. It is
        NOT a therapy service, NOT a medical service, and NOT a substitute for
        professional mental health care. By using SoulBridge, you agree to these terms.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>2. Eligibility</h2>
      <p>
        You must be at least 18 years old to use SoulBridge. By creating an
        account, you confirm that you meet this requirement.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>3. Free and Pro Plans</h2>
      <p>
        SoulBridge offers a Free plan with limited daily usage and a Pro plan
        at $9.99/month with unlimited access. You can upgrade at any time.
        Subscription payments are processed securely by Paddle.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>4. Acceptable Use</h2>
      <p>
        You agree not to misuse SoulBridge, attempt to reverse-engineer it,
        or use it for any unlawful purpose. The AI features are for
        self-improvement only — not for medical, legal, or professional advice.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>5. Crisis Situations</h2>
      <p>
        SoulBridge is not equipped to handle emergencies. If you are
        experiencing a mental health crisis or having thoughts of self-harm,
        please contact emergency services or a crisis helpline immediately
        (in the US: call or text 988; in the UK: call 116 123).
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>6. Account Termination</h2>
      <p>
        You may delete your account at any time from your account settings.
        We reserve the right to suspend accounts that violate these terms.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>7. Disclaimer</h2>
      <p>
        SoulBridge is provided "as is" without warranties of any kind.
        We are not liable for any damages arising from your use of the app.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>8. Contact</h2>
      <p>
        If you have questions about these Terms, please contact us through the app.
      </p>
    </div>
  );
}

export default Terms;