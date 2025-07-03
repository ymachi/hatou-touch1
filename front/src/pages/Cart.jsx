import { useEffect, Fragment, useState } from 'react';
import { useCart } from '../context/CartContext';
import { token } from '../context/token';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../css/cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [formInput, setFormInput] = useState({
    lastname: "",
    firstname: "",
    email: "",
    tel: "",
    address: "",
    message: "",
    remise: false,
    delivery: false,
  });

  const calculateTotals = () => {
    const subTotal = cart.reduce((acc, item) => acc + item.price.amount * item.quantity, 0);
    const deliveryFee = formInput.delivery ? 10 : 0;
    setSubTotal(subTotal);
    setTotalPrice(subTotal + deliveryFee);
  };

  useEffect(() => {
    calculateTotals();
  }, [cart, formInput.delivery]);

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setFormInput((prevFormInput) => ({
        ...prevFormInput,
        lastname: user.lastname || "",
        firstname: user.firstname || "",
        email: user.email || "",
        tel: user.tel || "",
        address: user.address || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInput({
      ...formInput,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { lastname, firstname, email, tel, address, message, remise, delivery } = formInput;

    
    if (
      lastname.trim() === "" ||
      firstname.trim() === "" ||
      email.trim() === "" ||
      tel.trim() === "" ||
      (delivery && address.trim() === "")
    ) {
      return toast.warning("Veuillez remplir tous les champs.");
    }

    const boxsId = cart.map((item) => item._id);

    try {
      const res = await axios.post("/api/orders/new", 
        {
          lastname,
          firstname,
          email,
          tel,
          address,
          message,
          remise,
          delivery,
          boxsId
        }, 
        { headers: token() }
      );
      toast.success("Commande passée avec succès !");
    } catch (e) {
      console.log(e.response);
      toast.error("Erreur lors de la commande. Veuillez réessayer.");
    }
  };

  return (
    <main>
      <div className="container">
        <article className="intro">
          <h1>Mon Panier</h1>
        </article>

        <section className="parents-cart">
          <section className="partone-cart">
            <article className="cart">
              <h2 className="title-cart">Mon panier</h2>
              {cart.length > 0 ? (
                cart.map((box) => (
                  <Fragment key={box._id}>
                    <h4>{box.name} x{box.quantity}</h4>
                    <p>{box.description}</p>
                    <p>{box.price.amount} {box.price.currency}</p>
                    <button className="add-cart" onClick={() => removeFromCart(box._id)}>Supprimer</button>
                  </Fragment>
                ))
              ) : (
                <p>Panier vide</p>
              )}
            </article>

            <article className="delivery">
              <h2 className="title-delivery">Mode de retrait</h2>
              <form>
                <ul>
                  <li>
                    <label htmlFor="remise">Remise en main propre</label>
                    <input
                      type="checkbox"
                      name="remise"
                      checked={formInput.remise}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label htmlFor="delivery">Livraison + 10€</label>
                    <input
                      type="checkbox"
                      name="delivery"
                      checked={formInput.delivery}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
                <p>Si vous cochez l'adresse livraison, veuillez mettre votre adresse</p>
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse de livraison"
                  value={formInput.address}
                  onChange={handleChange}
                />
              </form>
            </article>

            <article className="personal">
              <h2 className="title-personal">Informations personnelles</h2>
              <form>
                <label htmlFor="lastname">Nom</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Nom"
                  value={formInput.lastname}
                  onChange={handleChange}
                />
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Prénom"
                  value={formInput.firstname}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formInput.email}
                  onChange={handleChange}
                />
                <label htmlFor="tel">Téléphone</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="Numéro"
                  value={formInput.tel}
                  onChange={handleChange}
                />
                <label htmlFor="message">Note</label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  placeholder="Note"
                  value={formInput.message}
                  onChange={handleChange}
                />
              </form>
            </article>
          </section>

          <section className="partitwo-cart">
            <article className="payments">
              <h2 className="title-payments">Nous acceptons</h2>
              <p>Paypal</p>
              <p>Lydia</p>
              <p>Revolut</p>
            </article>
            <article className="total">
              <h2 className="title-total">Total</h2>
              <p>Sous-Total : {subTotal}€</p>
              <p>Livraison : {formInput.delivery ? "10€" : "0€"}</p>
              <p>Total : {totalPrice}€</p>
              <form onSubmit={handleSubmit}>
                <input type="submit" name="order" value="Commander" />
              </form>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

export default Cart;
