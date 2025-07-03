import { useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../css/reset-password.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return toast.error("Les mots de passe ne correspondent pas");
     
    }

    try {
      const res = await axios.patch(`/api/users/reset-password`, { token, email, password });
      toast.success("Mot de passe mis à jour, veuillez vous connecter");
      navigate("/login");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="container-reset">
      <main>
        <section className="intro">
          <h1>Mot de passe oublié</h1>
        </section>
        <form className="reset-password" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </section>
          <section>
            <label htmlFor="password-confirm">Confirmez le mot de passe : </label>
            <input
              type="password"
              id="password-confirm"
              name="password-confirm"
              placeholder="Confirmez le mot de passe"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </section>
          <input type="submit" value="Réinitialiser" />
        </form>
        <section>
          <p>Se connecter ? <NavLink to="/login">Appuyer ici</NavLink></p>
          <p>Pas encore inscrit ? <NavLink to="/register">S'inscrire ici</NavLink></p>
        </section>
      </main>
    </div>
  );
};

export default ResetPassword;
