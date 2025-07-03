import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const userCart = sessionStorage.getItem("cart");
    return userCart ? JSON.parse(userCart) : [];
  });

  
  const addToCart = (box) => {
    const existingBox = cart.find(item => item._id === box._id);
    let updatedCart;

    if (existingBox) {
      updatedCart = cart.map(item =>
        item._id === box._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...box, quantity: 1 }];
    }

    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (boxId) => {
    const updatedCart = cart
      .map(box =>
        box._id === boxId
          ? { ...box, quantity: box.quantity - 1 }
          : box
      )
      .filter(box => box.quantity > 0);

    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
