import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(
        "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {        
        loginUser(response.data);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          {/* <img src={boardifyLogo} alt="Boardify Logo" className="w-16 h-16" /> */}
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600 text-5xl">Boardify</span>
        </h1>
        <p className="text-center text-gray-600 mb-2">
          <span className="text-green-500 font-bold text-xl">Log in</span> to manage your projects efficiently.
        </p>
        {error && (
          <p className="text-red-500 text-center bg-red-100 p-2 rounded mb-4">
            {error}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          onClick={handleLogin}
          className="bg-indigo-600 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Log In
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="text-indigo-600 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
