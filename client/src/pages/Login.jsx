import { useState } from "react";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      setMessage("Login Successful 🚀");

      console.log(response.data);

    } catch (error) {

      console.log(error);

      setMessage("Invalid Credentials ❌");
    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-10 rounded-2xl w-[400px]"
      >

        <h1 className="text-5xl font-bold text-center text-blue-500 mb-10">
          Login 🔐
        </h1>

        <div className="mb-5">
          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            className="w-full p-3 mt-2 rounded-lg bg-zinc-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 mt-2 rounded-lg bg-zinc-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg mt-4"
        >
          Login
        </button>

        {
          message && (
            <p className="text-center text-green-400 mt-5">
              {message}
            </p>
          )
        }

      </form>

    </div>
  );
}

export default Login;