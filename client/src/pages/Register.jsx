import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );

      setMessage(response.data.message);

    } catch (error) {

      console.log(error);

      setMessage("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <div className="bg-zinc-900 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-zinc-800">

        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Register 📝
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          <div>
            <label className="block text-gray-400 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-semibold"
          >
            Create Account
          </button>

          {
            message && (
              <p className="text-center text-green-400">
                {message}
              </p>
            )
          }

        </form>

      </div>

    </div>
  );
}

export default Register;