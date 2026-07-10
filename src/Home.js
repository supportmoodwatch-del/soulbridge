import React, { useState, useEffect } from "react";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import { ChatIcon, HeartIcon, SparkleIcon, LockIcon, ArrowRightIcon } from "./Icons";
import { usePaddle } from "./usePaddle";

function Home() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(true);

  const navigate = useNavigate();
  const paddle = usePaddle();

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
    if (!paddle) {
      alert("Payment system loading, please try again in a moment.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    paddle.Checkout.open({
      items: [
        {
          priceId: process.env.REACT_APP_PADDLE_PRICE_ID,
          quantity: 1,
        },
      ],
      customer: {
        email: user.email,
      },
      customData: {
        userId: user.uid,
      },
      settings: {
        successUrl: `${window.location.origin}/?upgraded=true`,
      },
    });
  };

  // Check if user just completed payment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "true") {
      const user = auth.currentUser;
      if (user) {
        updateDoc(doc(db, "users", user.uid), { plan: "pro" }).then(() => {
          setPlan("pro");
          window.history.replaceState({}, "", "/");
        });
      }
    }
  }, []);

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
      <Sidebar plan={plan} />

      <div className="sb-main-content">
        <div className="sb-page">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
            className="sb-mobile-header"
          >
            <Logo size={22} />
            {!loadingPlan && (
              <span
                className={`sb-badge ${
                  plan === "pro" ? "sb-badge-pro" : "sb-badge-free"
                }`}
              >
                {plan === "pro" ? "PRO" : "FREE"}
              </span>
            )}
          </div>

          <h1 className="sb-title">Welcome back</h1>
          <p className="sb-subtitle">How are you feeling today?</p>

          <div className="sb-hero">
            <p className="sb-hero-quote">
              "Connection is built in the moments we choose to truly understand
              each other."
            </p>
            <p className="sb-hero-source">— SoulBridge</p>
          </div>

          {!loadingPlan && plan === "free" && (
            <div className="sb-card-accent" style={{ marginBottom: "20px" }}>
              <p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
                Upgrade to Pro for unlimited conversations and the Daily
                Connection Capsule — $9.99/month.
              </p>
              <button
                onClick={handleUpgrade}
                className="sb-btn sb-btn-warm"
              >
                Upgrade to Pro — $9.99/mo
              </button>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
              marginBottom: "8px",
            }}
          >
            <div className="sb-feature-card">
              <div className="sb-feature-icon teal">
                <ChatIcon size={22} />
              </div>
              <h3>Emotional Translator</h3>
              <p>
                Translate emotions into understanding. Explore what you feel
                and why.
              </p>
              <button
                onClick={() => navigate("/emotional-translator")}
                className="sb-btn sb-btn-primary"
              >
                Start Translating <ArrowRightIcon size={15} />
              </button>
            </div>

            <div className="sb-feature-card">
              <div className="sb-feature-icon terracotta">
                <HeartIcon size={22} />
              </div>
              <h3>Intimacy Lab</h3>
              <p>
                Practice difficult conversations in a safe space, one scenario
                at a time.
              </p>
              <button
                onClick={() => navigate("/intimacy-lab")}
                className="sb-btn sb-btn-warm"
              >
                Enter the Lab <ArrowRightIcon size={15} />
              </button>
            </div>

            <div className="sb-feature-card">
              <div className="sb-feature-icon teal">
                <SparkleIcon size={22} />
              </div>
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Daily Connection Capsule
                {plan !== "pro" && <LockIcon size={13} />}
              </h3>
              <p>
                A small task each day to help you connect with someone who
                matters.
              </p>
              <button
                onClick={() => navigate("/daily-capsule")}
                className="sb-btn sb-btn-primary"
              >
                Open Capsule <ArrowRightIcon size={15} />
              </button>
            </div>
          </div>

          <hr className="sb-divider" />

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="sb-text-link"
            >
              Delete my account
            </button>
          ) : (
            <div
              className="sb-card"
              style={{ borderColor: "var(--color-danger)" }}
            >
              <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
                Are you sure? This will permanently delete your account and all
                your data.
              </p>
              {error && <p className="sb-error">{error}</p>}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="sb-btn sb-btn-danger"
                >
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
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;