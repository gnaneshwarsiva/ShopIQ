import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + Number(item.price) * item.quantity,

    0

  );

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-blue-500 mb-10">
        Cart 🛒
      </h1>

      {cartItems.length === 0 ? (

        <p className="text-gray-400 text-xl">
          Your cart is empty
        </p>

      ) : (

        <div className="space-y-6">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-900 p-5 rounded-2xl flex justify-between items-center"
            >

              {/* LEFT SIDE */}

              <div>

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-gray-400 mt-2">
                  {item.description}
                </p>

                {/* QUANTITY CONTROLS */}

                <div className="flex items-center gap-4 mt-4">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-2xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="text-right">

                <p className="text-blue-400 text-2xl font-bold">
                  ₹ {Number(item.price) * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* TOTAL PRICE */}

      <div className="mt-10 text-right">

        <h2 className="text-4xl font-bold text-green-400">
          Total: ₹ {totalPrice}
        </h2>

      </div>

    </div>
  );
}

export default Cart;