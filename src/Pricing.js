import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Pricing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", padding: "40px 24px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <Logo size={24} showTagline={true} />
        </div>

        <h1 className="sb-title" style={{ marginBottom: "8px" }}>Simple, transparent pricing</h1>
        <p className="sb-subtitle">Start free, upgrade when you're ready.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "32px" }}>
          {/* Free plan */}
          <div className="sb-card">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", margin: "0 0 8px 0" }}>
              Free
            </h2>
            <p style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 4px 0", color: "var(--color-text)" }}>
              $0
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: "0 0 20px 0" }}>
              forever
            </p>
            <ul style={{ padding: "0 0 0 16px", margin: "0 0 20px 0", color: "var(--color-text-muted)", fontSize: "14px", lineHeight: "2" }}>
              <li>5 Emotional Translator messages/day</li>
              <li>3 Intimacy Lab messages/day</li>
              <li>Access to all scenarios</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="sb-btn sb-btn-secondary sb-btn-block"
            >
              Get started free
            </button>
          </div>

          {/* Pro plan */}
          <div className="sb-card" style={{ borderColor: "var(--color-teal)", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--color-teal)",
              color: "white",
              fontSize: "11px",
              fontWeight: "700",
              padding: "4px 12px",
              borderRadius: "20px",
              letterSpacing: "0.05em",
            }}>
              MOST POPULAR
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", margin: "0 0 8px 0" }}>
              Pro
            </h2>
            <p style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 4px 0", color: "var(--color-teal)" }}>
              $9.99
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", margin: "0 0 20px 0" }}>
              per month
            </p>
            <ul style={{ padding: "0 0 0 16px", margin: "0 0 20px 0", color: "var(--color-text-muted)", fontSize: "14px", lineHeight: "2" }}>
              <li>Unlimited Emotional Translator</li>
              <li>Unlimited Intimacy Lab</li>
              <li>Daily Connection Capsule</li>
              <li>7-day money-back guarantee</li>
            </ul>
            <button
              onClick={() => navigate("/signup")}
              className="sb-btn sb-btn-primary sb-btn-block"
            >
              Get started — $9.99/mo
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            Payments processed securely by Paddle. Cancel anytime.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "12px" }}>
            <button onClick={() => navigate("/terms")} className="sb-text-link">Terms</button>
            <button onClick={() => navigate("/privacy-policy")} className="sb-text-link">Privacy</button>
            <button onClick={() => navigate("/refunds")} className="sb-text-link">Refunds</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;