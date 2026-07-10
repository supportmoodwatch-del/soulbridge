import React from "react";
import { useNavigate } from "react-router-dom";

function Refunds() {
  const navigate = useNavigate();

  return (
    <div className="sb-page" style={{ lineHeight: "1.65", maxWidth: "700px" }}>
      <button onClick={() => navigate(-1)} className="sb-back" style={{ marginBottom: "20px" }}>
        ← Back
      </button>

      <h1 className="sb-title">Refund Policy</h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>Last updated: July 2026</p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>1. Subscription Payments</h2>
      <p>
        SoulBridge Pro is billed monthly at $9.99/month. Payments are
        processed securely by Paddle. Your subscription renews automatically
        each month unless cancelled.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>2. Cancellation</h2>
      <p>
        You may cancel your subscription at any time. After cancellation,
        you will continue to have access to Pro features until the end of
        your current billing period. No further charges will be made.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>3. Refunds</h2>
      <p>
        We offer a <strong>7-day money-back guarantee</strong> for new Pro
        subscribers. If you are not satisfied with SoulBridge Pro within the
        first 7 days of your subscription, contact us and we will issue a
        full refund — no questions asked.
      </p>
      <p>
        After the 7-day period, refunds are issued at our discretion for
        exceptional circumstances (e.g. technical issues that prevented
        access to the service).
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>4. How to Request a Refund</h2>
      <p>
        To request a refund, contact us through the app within 7 days of
        your purchase. Please include your account email and the date of
        your subscription. We will process your refund within 5-10 business days.
      </p>

      <h2 style={{ fontFamily: "var(--font-display)" }}>5. Contact</h2>
      <p>
        If you have questions about our refund policy, please contact us
        through the app.
      </p>
    </div>
  );
}

export default Refunds;