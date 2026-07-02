import React from "react";

function Logo({ size = 28, showTagline = false }) {
  const height = size * 0.9;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={size * 1.9}
        height={height}
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 32 L22 32 L27 18 L32 42 L38 22 C42 12 48 5 50 5"
          stroke="var(--color-teal)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M50 5 C52 5 58 12 62 22 L68 42 L73 18 L78 32 L98 32"
          stroke="var(--color-terracotta)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: size * 0.62,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "var(--color-teal)" }}>Soul</span>
          <span style={{ color: "var(--color-terracotta)" }}>Bridge</span>
        </div>
        {showTagline && (
          <div
            style={{
              fontSize: size * 0.24,
              color: "var(--color-text-muted)",
              letterSpacing: "0.02em",
              marginTop: "2px",
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