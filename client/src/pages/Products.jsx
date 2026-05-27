import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../context/CartContext";

function Products() {

  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  // FILTER PRODUCTS

  const filteredProducts = products.filter((product) =>

    product.name.toLowerCase().includes(
      searchTerm.toLowerCase()
    )

  );

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-center text-blue-500 mb-10">
        Products 🛍️
      </h1>

      {/* SEARCH BAR */}

      <div className="flex justify-center mb-10">

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl p-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:border-blue-500 text-white"
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {filteredProducts.map((product) => (

          <div
            key={product.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg"
          >

            {/* CLICKABLE IMAGE */}

            <Link to={`/products/${product.id}`}>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain bg-black"
              />

            </Link>

            <div className="p-5">

              {/* CLICKABLE NAME */}

              <Link to={`/products/${product.id}`}>

                <h2 className="text-2xl font-bold hover:text-blue-400 transition">
                  {product.name}
                </h2>

              </Link>

              <p className="text-gray-400 mt-2">
                {product.description}
              </p>

              <p className="text-blue-400 text-xl mt-4 font-bold">
                ₹ {product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full"
              >
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Products;