import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../css/login.css";

const Login = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: ""
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", formInput);
      toast.success("Vous êtes bien connecté, vous allez être redirigé.");
      auth.login(res.data);
      setTimeout(() => navigate("/"), 2000);
    } catch (e) {
      console.log(e)
      toast.error(e.response?.data?.message || "Erreur lors de la connexion.");
    }
  };

  return (
    <main>
      <div className="login-container">
        <h1 className="title-login">SE CONNECTER</h1>
         <div className="underline"></div>

        <div className="login-box">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login-grid">
              <div className="login-field">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formInput.email}
                  onChange={handleChange}
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">Mot de passe :</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={formInput.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <input type="submit" value="SE CONNECTER" />
          </form>
        </div>

        <section className="login-links">
          <p>Mot de passe oublié ? <NavLink to="/reset-password">Réinitialiser ici</NavLink></p>
          <p>Pas encore inscrit ? <NavLink to="/s'inscrire">S'inscrire ici</NavLink></p>
        </section>
      </div>
    </main>
  );
};

export default Login;
