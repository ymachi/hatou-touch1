import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css"; // tu peux renommer selon ton organisation
import Comment from "../components/Comment";
const Home = () => {
  const navigate = useNavigate();

  const handleDevisClick = () => {
    navigate("/demande-de-devis");
  };
  const handleRealisationsClick = () => {
    navigate("/réalisations");
  };

  return (
    <>
      <section className="hero">
        <article className="hero-overlay">
          <h1 className="hero-title">Une Réception unique à votre Image</h1>
          <button className="hero-btn" onClick={handleDevisClick}>
            DEMANDE DE DEVIS
          </button>
        </article>
      </section>

      <section className="description-section">
        <h2 className="description-title">
          Hatou'Touch – Créateur de mignardises sur mesure
        </h2>
        <div className="underline"></div>
        <p className="description-text">
          Bien plus qu’un service de mignardises, Hatou’Touch imagine des
          compositions gourmandes et élégantes pour sublimer vos événements. Que
          ce soit pour un brunch d’entreprise ou une soirée privée, nos boxs
          sont pensées comme de véritables expériences visuelles et gustatives.
          <br />
          <br />
          Vous avez un thème, un budget ou une idée originale ? On s’adapte, on
          crée, on régale.
        </p>
      </section>

      <section className="menu">
        <h2 className="title-menu">Notre Menu</h2>
        <div className="underline"></div>
        <img
          className="img-responsive img-menu"
          src="img/menu-ht.png"
          alt="Carte"
        />
      </section>

      <section className="cta-container">
        <button className="hero-btn" onClick={() => navigate("/réalisations")}>
         VOIR NOS RÉALISATIONS
        </button>
      </section>

      <Comment />
    </>
  );
};

export default Home;
