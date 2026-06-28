import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!consentChecked) {
      setError("You must agree to the Privacy Policy and Terms to continue.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        consentGiven: true,
        consentTimestamp: serverTimestamp(),
        plan: "free",
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in instead.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="sb-page-narrow">
      <div style={{ marginBottom: "36px" }}>
        <Logo size={30} showTagline={true} />
      </div>

      <h1 className="sb-title">Create your account</h1>
      <p className="sb-subtitle">Start your practice with SoulBridge.</p>

      <form onSubmit={handleSignup}>
        <div className="sb-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="sb-input"
          />
        </div>

        <div className="sb-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="sb-input"
          />
        </div>

        <div className="sb-field">
          <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontWeight: "normal" }}>
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              style={{ marginTop: "4px" }}
            />
            <span style={{ fontSize: "14px" }}>
              I agree to the{" "}
              <Link to="/privacy-policy" target="_blank">
                Privacy Policy and Terms of Service
              </Link>
            </span>
          </label>
        </div>

        {error && <p className="sb-error">{error}</p>}

        <button type="submit" disabled={loading} className="sb-btn sb-btn-primary sb-btn-block">
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p style={{ marginTop: "20px", fontSize: "14px", color: "var(--color-text-muted)" }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;