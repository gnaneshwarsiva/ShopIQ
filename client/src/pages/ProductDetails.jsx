import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { CartContext } from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((response) => {

        const products = response.data;

        const foundProduct = products.find(
          (item) => item.id === Number(id)
        );

        setProduct(foundProduct);

        // RECOMMENDED PRODUCTS

        const recommendations = products.filter(
          (item) => item.id !== Number(id)
        );

        setRecommendedProducts(recommendations);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  if (!product) {

    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center text-3xl">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* PRODUCT DETAILS */}

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl"
          />

        </div>

        {/* DETAILS */}

        <div>

          <h1 className="text-6xl font-bold text-blue-500">
            {product.name}
          </h1>

          <p className="text-gray-400 text-xl mt-6">
            {product.description}
          </p>

          <p className="text-green-400 text-5xl font-bold mt-8">
            ₹ {product.price}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-xl"
          >
            Add To Cart
          </button>

        </div>

      </div>

      {/* RECOMMENDATIONS */}

      <div className="mt-20">

        <h2 className="text-4xl font-bold text-blue-500 mb-10">
          You May Also Like 🤖
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {recommendedProducts.map((item) => (

            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden"
            >

              <Link to={`/products/${item.id}`}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-contain bg-black"
                />

              </Link>

              <div className="p-5">

                <Link to={`/products/${item.id}`}>

                  <h3 className="text-2xl font-bold hover:text-blue-400 transition">
                    {item.name}
                  </h3>

                </Link>

                <p className="text-gray-400 mt-2">
                  {item.description}
                </p>

                <p className="text-green-400 text-2xl font-bold mt-4">
                  ₹ {item.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default ProductDetails;