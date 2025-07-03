import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { token } from "../context/token";
import "../css/estimate.css";

const Estimate = () => {
  const { user } = useAuth();

  const [formInput, setFormInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    tel: "",
    invited: "",
    event: "",
    eventDate: "",
    budget: "",
    compagny: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormInput({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        address: user.address || "",
        tel: user.tel || "",
        invited: "",
        event: "",
        eventDate: "",
        budget: "",
        compagny: "",
        message: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      address,
      tel,
      invited,
      event,
      eventDate,
      budget,
    } = formInput;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !address ||
      !tel ||
      !invited ||
      !event ||
      !eventDate ||
      !budget
    ) {
      return toast.warning("Veuillez remplir tous les champs obligatoires.");
    }

    try {
      const res = await axios.post("/api/estimates/new", formInput, {
        headers: token(),
      });
      toast.success(res.data.message);
      setFormInput({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        tel: "",
        invited: "",
        event: "",
        eventDate: "",
        budget: "",
        compagny: "",
        message: "",
      });
      setCaptchaInput("");
    } catch (e) {
      toast.error(e.response?.data?.message || "Erreur lors de l'envoi.");
    }
  };

  return (
    <main>
      <div className="devis-container">
        <section className="intro-devis">
          <h1 className="title-devis">DEMANDE DE DEVIS</h1>
          <div className="underline"></div>
          <p>
            Vous souhaitez un devis pour la réalisation d’un buffet ou d’une
            réception ? Remplissez le formulaire ci-dessous avec vos
            informations. Nous reviendrons vers vous sous 48h, pour échanger
            ensemble de votre projet et avec une proposition tarifaire
            sur-mesure. Si le devis est accepté ; un acompte de 50 % vous sera
            demandé afin de sécuriser la commande. Paiement possible via Paypal,
            Revolut, Lydia.
          </p>
        </section>

        <form className="devis" onSubmit={handleSubmit}>
          <div className="parents-estimate">
            <section className="partone-estimate">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Prénom"
                value={formInput.firstname}
                onChange={handleChange}
              />

              <label htmlFor="lastname">Nom : </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Nom"
                value={formInput.lastname}
                onChange={handleChange}
              />

              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formInput.email}
                onChange={handleChange}
              />

              <label htmlFor="address">Adresse :</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Adresse"
                value={formInput.address}
                onChange={handleChange}
              />

              <label htmlFor="tel">Téléphone :</label>
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="Téléphone"
                value={formInput.tel}
                onChange={handleChange}
              />
            </section>

            <section className="parttwo-estimate">
              <label htmlFor="invited">Nombre d'invités :</label>
              <input
                type="number"
                id="invited"
                name="invited"
                placeholder="Nombre d'invités"
                value={formInput.invited}
                onChange={handleChange}
              />

              <label htmlFor="event">Type d'événement :</label>
              <select
                id="event"
                name="event"
                value={formInput.event}
                onChange={handleChange}
              >
                <option value="">Type d'événement</option>
                <option value="professionnel">Professionnel</option>
                <option value="privé">Privé</option>
                <option value="association">Association</option>
              </select>

              <label htmlFor="eventDate">Date de l’événement :</label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formInput.eventDate}
                onChange={handleChange}
              />

              <label htmlFor="budget">Budget : </label>
              <input
                type="number"
                id="budget"
                name="budget"
                placeholder="Budget"
                value={formInput.budget}
                onChange={handleChange}
              />

              <label htmlFor="compagny">Raison sociale (si pro) :</label>
              <input
                type="text"
                id="compagny"
                name="compagny"
                placeholder="Raison sociale"
                value={formInput.compagny}
                onChange={handleChange}
              />
            </section>
          </div>

          <label htmlFor="message">Message : </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Message"
            value={formInput.message}
            onChange={handleChange}
          ></textarea>

          <div className="captcha-container">
            <div className="captcha-box">
              <img src="img/captcha.png" alt="captcha" />
            </div>
          </div>
          <div className="rgpd-wrapper">
            <input type="checkbox" required id="rgpd" />
            <label htmlFor="rgpd" className="rgpd-label">
              J'accepte que mes données soient utilisées dans le cadre de cette
              demande, conformément à la{" "}
              <NavLink to="/politique-de-confidentialite" target="_blank">
                politique de confidentialité
              </NavLink>
              .
            </label>
          </div>

          <input type="submit" value="VALIDER" />
        </form>
      </div>
    </main>
  );
};

export default Estimate;
