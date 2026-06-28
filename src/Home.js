import React, { useState, useEffect } from "react";
import { signOut, deleteUser } from "firebase/auth";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import BottomNav from "./BottomNav";
import { ChatIcon, HeartIcon, SparkleIcon, LockIcon, ArrowRightIcon } from "./Icons";

function Home() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [upgrading, setUpgrading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      setPlan(userDoc.data().plan || "free");
    }
    setLoadingPlan(false);
  };

  const handleUpgrade = async () => {
    setUpgrading(true);
    const user = auth.currentUser;
    await updateDoc(doc(db, "users", user.uid), { plan: "pro" });
    setPlan("pro");
    setUpgrading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setError("");

    try {
      const user = auth.currentUser;
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      navigate("/signup");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setError(
          "For security, please log out and log back in, then try deleting your account again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
      setDeleting(false);
    }
  };

  return (
    <div className="sb-app-shell">
      <div className="sb-page">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Logo size={32} showTagline={true} />
          {!loadingPlan && (
            <span className={`sb-badge ${plan === "pro" ? "sb-badge-pro" : "sb-badge-free"}`}>
              {plan === "pro" ? "PRO" : "FREE"}
            </span>
          )}
        </div>

        <h1 className="sb-title">Welcome back</h1>
        <p className="sb-subtitle" style={{ marginBottom: "20px" }}>
          How are you feeling today?
        </p>

        <div className="sb-hero">
          <p className="sb-hero-quote">
            "Connection is built in the moments we choose to truly understand
            each other."
          </p>
          <p className="sb-hero-source">— SoulBridge</p>
        </div>

        {!loadingPlan && plan === "free" && (
          <div className="sb-card-accent" style={{ marginBottom: "18px" }}>
            <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
              Upgrade to Pro for unlimited conversations and the Daily Connection Capsule.
            </p>
            <button onClick={handleUpgrade} disabled={upgrading} className="sb-btn sb-btn-warm">
              {upgrading ? "Upgrading..." : "Upgrade to Pro"}
            </button>
          </div>
        )}

        <div className="sb-feature-card">
          <div className="sb-feature-icon teal" style={{ color: "var(--color-teal)" }}>
            <ChatIcon size={22} />
          </div>
          <h3>Emotional Translator</h3>
          <p>Translate emotions into understanding. Explore what you feel and why.</p>
          <button onClick={() => navigate("/emotional-translator")} className="sb-btn sb-btn-primary">
            Start Translating <ArrowRightIcon size={15} />
          </button>
        </div>

        <div className="sb-feature-card">
          <div className="sb-feature-icon terracotta" style={{ color: "var(--color-terracotta)" }}>
            <HeartIcon size={22} />
          </div>
          <h3>Intimacy Lab</h3>
          <p>Practice difficult conversations in a safe space, one scenario at a time.</p>
          <button onClick={() => navigate("/intimacy-lab")} className="sb-btn sb-btn-warm">
            Enter the Lab <ArrowRightIcon size={15} />
          </button>
        </div>

        <div className="sb-feature-card">
          <div className="sb-feature-icon teal" style={{ color: "var(--color-teal)" }}>
            <SparkleIcon size={22} />
          </div>
          <h3 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            Daily Connection Capsule {plan !== "pro" && <LockIcon size={13} />}
          </h3>
          <p>A small task each day to help you connect with someone who matters.</p>
          <button onClick={() => navigate("/daily-capsule")} className="sb-btn sb-btn-primary">
            Open Capsule <ArrowRightIcon size={15} />
          </button>
        </div>

        <hr className="sb-divider" />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          <button onClick={handleLogout} className="sb-btn sb-btn-danger">
            Log Out
          </button>
          <button onClick={() => navigate("/privacy-policy")} className="sb-btn sb-btn-secondary">
            Privacy Policy
          </button>
        </div>

        {!showConfirm ? (
          <button onClick={() => setShowConfirm(true)} className="sb-text-link">
            Delete my account
          </button>
        ) : (
          <div className="sb-card" style={{ borderColor: "var(--color-danger)" }}>
            <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
              Are you sure? This will permanently delete your account and all
              your data. This cannot be undone.
            </p>

            {error && <p className="sb-error">{error}</p>}

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleDeleteAccount} disabled={deleting} className="sb-btn sb-btn-danger">
                {deleting ? "Deleting..." : "Yes, delete my account"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="sb-btn sb-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;