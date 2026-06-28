// This file handles daily usage limits for Free plan users
import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

export const FREE_LIMITS = {
  emotionalTranslator: 5,
  intimacyLab: 3,
};

function getTodayKey() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // e.g. "2026-06-26"
}

// Checks if the user can still send a message today for a given feature.
// featureKey is either "emotionalTranslator" or "intimacyLab"
export async function canUseFeature(userId, plan, featureKey) {
  if (plan === "pro") {
    return { allowed: true, remaining: null };
  }

  const todayKey = getTodayKey();
  const usageRef = doc(db, "usageCounters", `${userId}_${todayKey}`);
  const usageSnap = await getDoc(usageRef);

  const limit = FREE_LIMITS[featureKey];
  const currentCount = usageSnap.exists()
    ? usageSnap.data()[featureKey] || 0
    : 0;

  if (currentCount >= limit) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: limit - currentCount };
}

// Call this AFTER a successful AI message to record usage
export async function recordUsage(userId, featureKey) {
  const todayKey = getTodayKey();
  const usageRef = doc(db, "usageCounters", `${userId}_${todayKey}`);
  const usageSnap = await getDoc(usageRef);

  if (usageSnap.exists()) {
    await setDoc(
      usageRef,
      { [featureKey]: increment(1), userId: userId },
      { merge: true }
    );
  } else {
    await setDoc(usageRef, {
      userId: userId,
      date: todayKey,
      [featureKey]: 1,
    });
  }
}