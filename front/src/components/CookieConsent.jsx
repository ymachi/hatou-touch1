import { useEffect, useState } from "react";
import "../css/cookieConsent.css"; // crée ce fichier si tu l’as pas

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem("cookieConsent", value);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience. Acceptez-vous ?
      </p>
      <div className="cookie-buttons">
        <button onClick={() => handleConsent("accepted")}>Accepter</button>
        <button onClick={() => handleConsent("refused")}>Refuser</button>
      </div>
    </div>
  );
};

export default CookieConsent;
