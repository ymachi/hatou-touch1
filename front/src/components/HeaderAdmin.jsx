import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../pages/admin/cssadmin/dashboard.css";

const HeaderAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    document.body.classList.toggle("menu-open", newState);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.sidebar') && !e.target.closest('.burger-menu')) {
        setIsOpen(false);
        document.body.classList.remove("menu-open");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <header className="admin-header">
        <button className="burger-menu" onClick={toggleMenu}>
          &#9776;
        </button>

        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <img className="logo" src="/logoHTT.png" alt="logo" />
          <nav className="viewer-admin">
            <NavLink className="link-admin" to="/admin/boxs/dashboard">Gestion des box</NavLink>
            <NavLink className="link-admin" to="/admin/boxs/ajouter-box/">Ajouter une box</NavLink>
            <NavLink className="link-admin" to="/admin/clients/dashboard">Gestion des clients</NavLink>
            <NavLink className="link-admin" to="/admin/commandes/dashboard">Gestion des commandes</NavLink>
            <NavLink className="link-admin" to="/admin/devis/dashboard">Gestion des devis</NavLink>
            <NavLink className="link-admin" to="/admin/gallery/dashboard">Gestion des photos</NavLink>
            <NavLink className="link-admin" to="/admin/gallery/ajouter-photo">Ajouter une photo</NavLink>
            <NavLink className="link-admin" to="/admin/avis/dashboard">Gestion des avis</NavLink>

            {/* Bouton de retour sans déconnexion */}
            <NavLink className="link-admin retour" to="/">↩️</NavLink>

            {/* Bouton de déconnexion */}
            {user && user.token ? (
              <NavLink className="link-admin" to="/" onClick={handleLogout}>
                Se déconnecter
              </NavLink>
            ) : (
              <NavLink className="link-admin" to="/">Accueil</NavLink>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
