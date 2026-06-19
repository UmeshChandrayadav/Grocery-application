import { useAuth } from "../context/AuthContext";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role } = formData;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {
        const user = response.data[0];

        if (user.role !== role) {
          toast.error(`This account is not registered as "${role}"`);
          setLoading(false);
          return;
        }

        login(user);
        toast.success("Login successful!");

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Database endpoint not found (check json-server)");
        } else {
          toast.error(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        toast.error("Cannot reach server. Is json-server running on port 3000?");
      } else {
        toast.error("Something went wrong during login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 px-4 sm:px-6 md:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-700 mb-6 sm:mb-8">
          Login
        </h2>

        <div className="mb-4 sm:mb-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-4 sm:mb-5">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="mb-5 sm:mb-6">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-semibold text-white transition-colors
            ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;