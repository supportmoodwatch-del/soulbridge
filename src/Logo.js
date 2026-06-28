import React from "react";

function Logo({ size = 28, showTagline = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="19" fill="var(--color-surface)" stroke="var(--color-border)" />
        <path
          d="M8 24C8 16 13 11 20 11C27 11 32 16 32 24"
          stroke="var(--color-teal)"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="8" cy="26" r="2.2" fill="var(--color-terracotta)" />
        <circle cx="32" cy="26" r="2.2" fill="var(--color-terracotta)" />
      </svg>
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: size * 0.62,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "var(--color-text)",
            lineHeight: 1,
          }}
        >
          SoulBridge
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