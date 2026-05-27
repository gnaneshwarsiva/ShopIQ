import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  // LOAD CART FROM LOCAL STORAGE

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];

  });

  // SAVE CART TO LOCAL STORAGE

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  // ADD TO CART

  const addToCart = (product) => {

    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      // IF PRODUCT ALREADY EXISTS

      if (existingItem) {

        return prevItems.map((item) =>

          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item

        );

      }

      // NEW PRODUCT

      return [
        ...prevItems,
        { ...product, quantity: 1 }
      ];

    });

  };

  // INCREASE QUANTITY

  const increaseQuantity = (id) => {

    setCartItems((prevItems) =>

      prevItems.map((item) =>

        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item

      )

    );

  };

  // DECREASE QUANTITY

  const decreaseQuantity = (id) => {

    setCartItems((prevItems) =>

      prevItems
        .map((item) =>

          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item

        )
        .filter((item) => item.quantity > 0)

    );

  };

  // REMOVE PRODUCT

  const removeFromCart = (id) => {

    setCartItems((prevItems) =>

      prevItems.filter((item) => item.id !== id)

    );

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );
}

export default CartProvider;