import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import EmotionalTranslator from "./EmotionalTranslator";
import IntimacyLab from "./IntimacyLab";
import DailyCapsule from "./DailyCapsule";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/emotional-translator"
          element={user ? <EmotionalTranslator /> : <Navigate to="/login" />}
        />
        <Route
          path="/intimacy-lab"
          element={user ? <IntimacyLab /> : <Navigate to="/login" />}
        />
        <Route
          path="/daily-capsule"
          element={user ? <DailyCapsule /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;