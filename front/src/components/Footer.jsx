import React from "react";
import { NavLink } from "react-router-dom";
import "../css/style.css";


const Footer = () => {
  return (
    <>
      {/* <article className="retour">
        <button className="scrolltop">
          <a className="top" href="#logo">
            <i className="icofont-arrow-up"></i>
          </a>
        </button>
      </article> */}

      <footer>
        <section className="footer">
          <article className="contact">
            <h3>Contact</h3>
            <address>
              <p>5 Boulevard du Bois le Prêtre</p>
              <p>Paris, 75017</p>
              <p>+00 00 00 00 00</p>
            </address>
          </article>

          <article className="paiements">
            <h3>Moyens de paiements</h3>
            <p className="payment_mastercard"></p>
            <p className="payment_cb"></p>
            <p className="payment_visa"></p>
            <p className="payment_virement"></p>
          </article>

          <article className="socials">
            <h3>Réseaux sociaux</h3>
            <div className="icon">
              <NavLink className="socials" to="#">
                <i className="icofont-instagram"></i>
              </NavLink>
              <NavLink className="socials" to="#">
                <i className="icofont-snapchat"></i>
              </NavLink>
              <NavLink className="socials" to="#">
                <i className="icofont-tiktok"></i>
              </NavLink>
            </div>
          </article>

          <article className="mentions">
            <h3>Informations</h3>
            <div className="mentions-legales">
              <NavLink to="/mentions-legales">Mentions Légales</NavLink>
              <NavLink to="/politique-de-confidentialite">Politique de confidentialité</NavLink>
              <NavLink to="/politique-des-cookies">Politique des cookies</NavLink>
            </div>
          </article>
        </section>
      </footer>
    </>
  );
};

export default Footer;
