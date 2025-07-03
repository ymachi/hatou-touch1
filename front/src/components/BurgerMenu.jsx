import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../css/burger.css";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie !");
    setIsOpen(false);
    setTimeout(() => navigate("/se-connecter"), 1500);
  };

  return (
    <header className="mobile-header">
      <div className="burger-top">
        <img className="burger-logo" src="/logoHTT.png" alt="Hatou'Touch" />
        <div className="burger" onClick={toggleMenu}>
          <span className={isOpen ? "open" : ""}></span>
          <span className={isOpen ? "open" : ""}></span>
          <span className={isOpen ? "open" : ""}></span>
        </div>
      </div>

      <nav className={`mobile-nav ${isOpen ? "show" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/réalisations" onClick={toggleMenu}>
              Nos réalisations
            </Link>
          </li>
          <li>
            <Link to="/box-classique" onClick={toggleMenu}>
              Boxs
            </Link>
          </li>
          <li>
            <Link to="/demande-de-devis" onClick={toggleMenu}>
              Demande de devis
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </li>

          {user ? (
            <>
              {user.role === "admin" && (
                <li>
                  <NavLink to="/admin/boxs/dashboard" onClick={toggleMenu}>
                    Espace Admin
                  </NavLink>
                </li>
              )}
              {/* <li>
                <NavLink to="/mon-profil" onClick={toggleMenu}>
                  Mon profil
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  className="link"
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                >
                  Se déconnecter
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/se-connecter" onClick={toggleMenu}>
                Se connecter
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default BurgerMenu;
