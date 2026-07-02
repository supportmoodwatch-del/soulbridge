import React from "react";

function Logo({ size = 28, showTagline = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={size * 2.2}
        height={size}
        viewBox="0 0 110 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left flat line → spike up → spike down → bridge arc (teal) */}
        <path
          d="M2 28 L25 28 L30 14 L35 38 L40 20 C44 8 50 3 55 3"
          stroke="#5B9A93"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right bridge arc → spike down → spike up → flat line (terracotta) */}
        <path
          d="M55 3 C60 3 66 8 70 20 L75 38 L80 14 L85 28 L108 28"
          stroke="#D9966B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      <div>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: size * 0.68,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#5B9A93" }}>Soul</span>
          <span style={{ color: "#D9966B" }}>Bridge</span>
        </div>
        {showTagline && (
          <div
            style={{
              fontSize: size * 0.26,
              color: "var(--color-text-muted)",
              letterSpacing: "0.02em",
              marginTop: "3px",
            }}
          >
            Understand. Connect. Grow.
          </div>
        )}
      </div>
    </div>
  );
}

export default Logo;