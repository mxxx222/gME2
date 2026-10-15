import React, { useEffect, useState } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import { useSessionStore } from "@/lib/store";
import AgeGate from "@/pages/AgeGate";
import ConsentGate from "@/components/ConsentGate";
import BallTeaseScreen from "@/components/BallTeaseScreen";
import SessionBuilder from "@/components/SessionBuilder";
import SessionTimer from "@/components/SessionTimer";
import HistoryScreen from "@/components/HistoryScreen";

const App: React.FC = () => {
  const { isAgeVerified, setAgeVerified, config } = useSessionStore();
  const [currentScreen, setCurrentScreen] = useState<"consent" | "technique" | "builder" | "timer" | "history">("consent");

  useEffect(() => {
    const verified = localStorage.getItem("couple-edger-age-verified") === "true";
    if (verified) {
      setAgeVerified(true);
    }
  }, [setAgeVerified]);

  const handleConsentComplete = () => {
    setCurrentScreen("technique");
  };

  const handleBackToBuilder = () => {
    setCurrentScreen("builder");
  };

  const handleViewHistory = () => {
    setCurrentScreen("history");
  };

  if (!isAgeVerified) {
    return <AgeGate />;
  }

  return (
    <Router>
      <div className="app-shell">
        <header className="topbar">
          <Link to="/" className="wordmark">
            Couple<span className="wordmark-mark">Edger</span>
          </Link>
          <nav className="topbar-right">
            <span className="status-dot" aria-hidden="true" />
            <span className="eyebrow">
              <span aria-hidden="true" />
              LIVE
            </span>
            <span className="age-chip">18+</span>
          </nav>
        </header>

        <main className="main-content">
          {currentScreen === "consent" && (
            <ConsentGate onEnter={handleConsentComplete} />
          )}
          {currentScreen === "technique" && (
            <BallTeaseScreen onStartSession={() => setCurrentScreen("builder")} />
          )}
          {currentScreen === "builder" && (
            <SessionBuilder
              onStart={() => setCurrentScreen("timer")}
              onViewHistory={handleViewHistory}
            />
          )}
          {currentScreen === "timer" && (
            <SessionTimer
              config={{
                name: "Session",
                arousal: config.intensity,
                duration: config.duration * 1000,
                timestamp: Date.now(),
              }}
              onOpen={handleBackToBuilder}
            />
          )}
          {currentScreen === "history" && (
            <HistoryScreen onBack={() => setCurrentScreen("builder")} />
          )}
        </main>

        <footer className="footer">
          <span>CoupleEdger v0.1.0</span>
          <span className="footer-divider">|</span>
          <span>RACK / SSC Principles</span>
          <span className="footer-divider">|</span>
          <span>PWA Offline-Ready</span>
        </footer>
      </div>
    </Router>
  );
};

export default App;