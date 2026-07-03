import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Logo from "./Logo";
import { HomeIcon, ChatIcon, HeartIcon, SparkleIcon } from "./Icons";

function Sidebar({ plan }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const items = [
    { path: "/", Icon: HomeIcon, label: "Home" },
    { path: "/emotional-translator", Icon: ChatIcon, label: "Emotional Translator" },
    { path: "/intimacy-lab", Icon: HeartIcon, label: "Intimacy Lab" },
    { path: "/daily-capsule", Icon: SparkleIcon, label: "Daily Capsule" },
  ];

  return (
    <div className="sb-sidebar">
      <div className="sb-sidebar-logo">
        <Logo size={22} showTagline={true} />
      </div>

      <nav className="sb-sidebar-nav">
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`sb-sidebar-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <item.Icon size={18} />
            <span>{item.label}</span>
            {item.path === "/daily-capsule" && plan !== "pro" && (
              <span style={{ marginLeft: "auto", fontSize: "11px", opacity: 0.6 }}>🔒</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sb-sidebar-bottom">
        <button
          onClick={() => navigate("/privacy-policy")}
          className="sb-sidebar-item"
        >
          <span style={{ fontSize: "13px" }}>Privacy Policy</span>
        </button>
        <button
          onClick={handleLogout}
          className="sb-sidebar-item"
          style={{ color: "var(--color-danger)" }}
        >
          <span style={{ fontSize: "13px" }}>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;