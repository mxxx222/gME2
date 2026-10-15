import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSessionStore } from "@/lib/store";
import AgeGate from "@/pages/AgeGate";

const App: React.FC = () => {
  const { isAgeVerified, setAgeVerified } = useSessionStore();

  useEffect(() => {
    const verified = localStorage.getItem("couple-edger-age-verified") === "true";
    if (verified) {
      setAgeVerified(true);
    }
  }, [setAgeVerified]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAgeVerified ? <Navigate to="/dashboard" /> : <Navigate to="/age-gate" />} />
        <Route path="/age-gate" element={isAgeVerified ? <Navigate to="/dashboard" /> : <AgeGate />} />
        <Route path="/dashboard" element={isAgeVerified ? <div>Dashboard</div> : <Navigate to="/age-gate" />} />
      </Routes>
    </Router>
  );
};

export default App;