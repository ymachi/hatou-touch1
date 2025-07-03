import { useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import "../css/register.css";

const Register = () => {
  const [formInput, setFormInput] = useState({
    lastname: "",
    firstname: "",
    email: "",
    tel: "",
    address: "",
    password: "",
  });

  const [checkPwd, setCheckPwd] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const [isCompleted, setIsCompleted] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
    isNotFullCompleted();

    if (name === "password") {
      const minLength = value.length >= 8;
      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      return setCheckPwd({
        minLength,
        uppercase,
        lowercase,
        specialChar,
        isFocus: true,
      });
    }

    setCheckPwd((prev) => ({ ...prev, isFocus: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { lastname, firstname, email, password, tel, address } = formInput;

      if (
        lastname.trim() === "" ||
        firstname.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        tel.trim() === "" ||
        address.trim() === ""
      ) {
        return toast.warning("Veuillez remplir tous les champs.");
      }

      const res = await axios.post("/api/users/register", formInput);
      toast.success(res.data.message);
      navigate("/se-connecter");
    } catch (e) {
      toast.error(e.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  const renderValidation = (isValid) =>
    isValid ? (
      <span className="green">✅</span>
    ) : (
      <span className="red">❌</span>
    );

  const isNotFullCompleted = () => {
    const checkPwd =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/;
    setIsCompleted(!checkPwd.test(formInput.password));
  };

  return (
    <main>
      <div className="register-container">
        <h1 className="title-inscription">INSCRIPTION</h1>
        <div className="underline"></div>

        <div className="register-box">
          <form className="register" onSubmit={handleSubmit}>
            <div className="parents-register">
              <section className="partone-register">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Prénom"
                  onChange={handleChange}
                  value={formInput.firstname}
                />

                <label htmlFor="lastname">Nom :</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Nom"
                  onChange={handleChange}
                  value={formInput.lastname}
                />

                <label htmlFor="tel">Téléphone :</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="Numéro de téléphone"
                  onChange={handleChange}
                  value={formInput.tel}
                />
              </section>

              <section className="parttwo-register">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formInput.email}
                />

                <label htmlFor="address">Adresse :</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Adresse"
                  onChange={handleChange}
                  value={formInput.address}
                />

                <label htmlFor="password">Mot de passe :</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  value={formInput.password}
                />

                {checkPwd.isFocus && (
                  <section className="verif">
                    <p>
                      {renderValidation(checkPwd.minLength)} Au moins 8
                      caractères
                    </p>
                    <p>{renderValidation(checkPwd.uppercase)} Une majuscule</p>
                    <p>{renderValidation(checkPwd.lowercase)} Une minuscule</p>
                    <p>
                      {renderValidation(checkPwd.specialChar)} Un caractère
                      spécial
                    </p>
                  </section>
                )}
              </section>
            </div>

            <div className="rgpd-wrapper">
              <input type="checkbox" required id="rgpd" />
              <label htmlFor="rgpd" className="rgpd-label">
                J'accepte que mes données soient utilisées dans le cadre de
                cette demande, conformément à la{" "}
                <NavLink to="/politique-de-confidentialite" target="_blank">
                  politique de confidentialité
                </NavLink>
                .
              </label>
            </div>

            <input type="submit" value="S'INSCRIRE" />
          </form>
        </div>

        <section className="register-links">
          <p>
            Déjà un compte ?<NavLink to="/login"> Se connecter</NavLink>
          </p>
          <p>
            Mot de passe oublié ?
            <NavLink to="/reset-password"> Réinitialiser</NavLink>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Register;
