import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {

  const { cartItems } = useContext(CartContext);

  const token = localStorage.getItem("access_token");

  const handleLogout = () => {

    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    window.location.reload();
  };

  return (

    <nav className="bg-zinc-900 text-white px-8 py-5 flex justify-between items-center">

      <h1 className="text-3xl font-bold text-blue-500">
        ShopIQ 🚀
      </h1>

      <div className="flex gap-8 text-xl">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">
          Cart ({cartItems.length})
        </Link>

        {

          token ? (

            <button onClick={handleLogout}>
              Logout
            </button>

          ) : (

            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>

          )

        }

      </div>

    </nav>
  );
}

export default Navbar;