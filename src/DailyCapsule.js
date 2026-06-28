import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { sendToAI } from "./ai";
import { DAILY_CAPSULE_PROMPT } from "./prompts";

function getTodayKey() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

function DailyCapsule() {
  const [taskText, setTaskText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkPlanAndLoad();
  }, []);

  const checkPlanAndLoad = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const plan = userDoc.exists() ? userDoc.data().plan || "free" : "free";

    if (plan !== "pro") {
      setIsPro(false);
      setLoading(false);
      return;
    }

    setIsPro(true);
    await loadOrCreateTodayTask(user);
    setLoading(false);
  };

  const loadOrCreateTodayTask = async (user) => {
    const todayKey = getTodayKey();
    const capsuleRef = doc(db, "dailyCapsules", `${user.uid}_${todayKey}`);
    const capsuleSnap = await getDoc(capsuleRef);

    if (capsuleSnap.exists()) {
      const data = capsuleSnap.data();
      setTaskText(data.taskText);
      setIsDone(data.done || false);
    } else {
      const newTask = await sendToAI(DAILY_CAPSULE_PROMPT, [
        { role: "user", content: "Give me today's task." },
      ]);

      await setDoc(capsuleRef, {
        userId: user.uid,
        date: todayKey,
        taskText: newTask,
        done: false,
        createdAt: serverTimestamp(),
      });

      setTaskText(newTask);
      setIsDone(false);
    }
  };

  const markAsDone = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const todayKey = getTodayKey();
    const capsuleRef = doc(db, "dailyCapsules", `${user.uid}_${todayKey}`);

    await setDoc(capsuleRef, { done: true }, { merge: true });
    setIsDone(true);
  };

  return (
    <div className="sb-page">
      <div className="sb-topbar">
        <button onClick={() => navigate("/")} className="sb-back">
          ← Back
        </button>
        <h2 className="sb-title" style={{ fontSize: "20px" }}>
          Daily Connection Capsule
        </h2>
      </div>

      <p className="sb-subtitle">
        A small task each day to help you connect with someone.
      </p>

      {loading ? (
        <p style={{ color: "var(--color-text-muted)" }}>Loading...</p>
      ) : !isPro ? (
        <div className="sb-card-accent" style={{ textAlign: "center" }}>
          <p style={{ margin: "0 0 12px 0", fontWeight: "bold" }}>
            🔒 Daily Connection Capsule is a Pro feature.
          </p>
          <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "var(--color-text-muted)" }}>
            Upgrade to Pro to unlock a new connection task every day.
          </p>
          <button onClick={() => navigate("/")} className="sb-btn sb-btn-primary">
            Upgrade to Pro
          </button>
        </div>
      ) : (
        <div className={isDone ? "sb-card-success" : "sb-card"}>
          <p style={{ fontSize: "16px", marginBottom: "20px", lineHeight: "1.5" }}>{taskText}</p>

          {isDone ? (
            <p style={{ color: "var(--color-success)", fontWeight: "bold", margin: 0 }}>
              ✓ Done for today!
            </p>
          ) : (
            <button onClick={markAsDone} className="sb-btn sb-btn-primary">
              Mark as Done
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DailyCapsule;