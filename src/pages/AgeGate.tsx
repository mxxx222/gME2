import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/lib/store";
import type { AgeGateError } from "@/lib/types";

const AgeGate: React.FC = () => {
  const navigate = useNavigate();
  const { setAgeVerified } = useSessionStore();
  const [birthDate, setBirthDate] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<AgeGateError | "">("");

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validate = (): boolean => {
    if (!birthDate) {
      setError("under_18");
      return false;
    }

    const age = calculateAge(birthDate);
    if (age < 18) {
      setError("under_18");
      return false;
    }

    if (!consent) {
      setError("consent_required");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("couple-edger-age-verified", "true");
      setAgeVerified(true);
      navigate("/dashboard");
    }
  };

  const getErrorMessage = (): string => {
    switch (error) {
      case "under_18":
        return "You must be at least 18 years old to access this content.";
      case "consent_required":
        return "You must consent to proceed.";
      default:
        return "";
    }
  };

  return (
    <div className="age-gate-container">
      <h2>Age Verification</h2>

      {error && <p className="error">{getErrorMessage()}</p>}

      <form onSubmit={handleSubmit} className="age-form">
        <div className="field">
          <label htmlFor="birthDate">Date of Birth</label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="field checkbox-row">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="consent">I consent to accessing this adult application and confirm I am 18+</label>
        </div>

        <button type="submit">Enter Application</button>
      </form>

      <div className="info">
        <p>This application is designed for adults aged 18 and above.</p>
        <p>By entering, you agree to our terms of service and privacy policy.</p>
      </div>
    </div>
  );
};

export default AgeGate;