import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../css/contact.css";

const Contact = () => {
  const { user } = useAuth(); // pour obtenir l'utilisateur connecté

  const [formInput, setFormInput] = useState({
    lastname: "",
    firstname: "",
    email: "",
    tel: "",
    message: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormInput({
        lastname: user.lastname || "",
        firstname: user.firstname || "",
        email: user.email || "",
        tel: user.tel || "",
        message: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { lastname, firstname, email, tel, message } = formInput;

      // sécurité
      if (
        lastname.trim() === "" ||
        firstname.trim() === "" ||
        email.trim() === "" ||
        tel.trim() === "" ||
        message.trim() === ""
      ) {
        return toast.warning("Veuillez remplir tous les champs.");
      }

      const res = await axios.post("/api/contacts/new", formInput);
      toast.success(res.data.message);
      setFormInput({
        lastname: "",
        firstname: "",
        email: "",
        tel: "",
        message: "",
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <>
      <main>
        <div className="contact-container">
          <article className="intro-contact">
            <h1 className="title-contact" id="contact-title">
              CONTACT
            </h1>
            <div className="underline"></div>
            <p className="intro-contact" id="contact-description">
              Pour toutes questions ou demandes particulières n’hésitez pas à
              nous contacter.
            </p>
          </article>

          <form
            className="formcontact"
            onSubmit={handleSubmit}
            aria-labelledby="contact-title"
            aria-describedby="contact-description"
          >
            <div className="parents-contact">
              <section
                className="partone-contact"
                aria-labelledby="partone-title"
              >
                <h2 id="partone-title" hidden>
                  Informations Personnelles
                </h2>

                <label htmlFor="lastname" id="lastnameLabel">
                  Nom :
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Nom"
                  value={formInput.lastname}
                  onChange={handleChange}
                  aria-labelledby="lastnameLabel"
                />

                <label htmlFor="firstname" id="firstnameLabel">
                  Prénom :
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Prénom"
                  value={formInput.firstname}
                  onChange={handleChange}
                  aria-labelledby="firstnameLabel"
                />
              </section>

              <section
                className="parttwo-contact"
                aria-labelledby="parttwo-title"
              >
                <h2 id="parttwo-title" hidden>
                  Informations de Contact
                </h2>

                <label htmlFor="email" id="emailLabel">
                  Email :
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formInput.email}
                  onChange={handleChange}
                  aria-labelledby="emailLabel"
                />

                <label htmlFor="tel" id="telLabel">
                  Téléphone :{" "}
                </label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="Numéro"
                  value={formInput.tel}
                  onChange={handleChange}
                  aria-labelledby="telLabel"
                />
              </section>
            </div>

            <section className="message" aria-labelledby="messageLabel">
              <label htmlFor="message" id="messageLabel">
                Message :
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                cols="33"
                placeholder="Message"
                value={formInput.message}
                onChange={handleChange}
                aria-labelledby="messageLabel"
              ></textarea>
            </section>
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
            <input
              type="submit"
              value="Envoyer"
              aria-label="Envoyer le formulaire"
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default Contact;
