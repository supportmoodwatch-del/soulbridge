import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, ChatIcon, HeartIcon, SparkleIcon } from "./Icons";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { path: "/", Icon: HomeIcon, label: "Home" },
    { path: "/emotional-translator", Icon: ChatIcon, label: "Translator" },
    { path: "/intimacy-lab", Icon: HeartIcon, label: "Lab" },
    { path: "/daily-capsule", Icon: SparkleIcon, label: "Capsule" },
  ];

  return (
    <div className="sb-bottom-nav">
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`sb-nav-item ${location.pathname === item.path ? "active" : ""}`}
        >
          <item.Icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNav;