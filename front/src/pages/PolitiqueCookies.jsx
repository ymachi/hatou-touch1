import React from 'react';
import "../css/mentions.css";

const PolitiqueCookies = () => {
  return (
    <main className="mentions-container">
      <h1>Politique des Cookies</h1>
      <p>
        Le site Hatou'Touch utilise uniquement des cookies techniques et fonctionnels, nécessaires à la navigation et au bon fonctionnement du site.
      </p>
      <p>
        Lors de votre première visite, une bannière de consentement s’affiche en bas de page. Vous avez la possibilité d’accepter ou de refuser ces cookies.
      </p>
      <p>
        Aucun cookie publicitaire ni cookie de suivi tiers n’est utilisé sur ce site. Les cookies sont stockés uniquement sur votre navigateur via le localStorage.
      </p>
      <p>
        Vous pouvez à tout moment supprimer vos cookies dans les paramètres de votre navigateur.
      </p>
    </main>
  );
};

export default PolitiqueCookies;
