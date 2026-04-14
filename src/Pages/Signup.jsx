import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ import Link
import toast from 'react-hot-toast'
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "user",
  });

  const { name, email, password, confirmpassword, role } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required");
    if (!email.includes("@")) return toast.error("Please enter a valid email");
    if (password.trim().length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirmpassword) return toast.error("Passwords do not match");

    try {
      const alreadyExists = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );

      if (alreadyExists.data.length > 0) {
        toast.error("User already exists");
        return;
      }

      const result = await axios.post("http://localhost:3000/users", {
        name,
        email,
        password,
        confirmpassword,
        role,
      });

      if (result.status === 201) {
        toast.success("Signup successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
          role: "user",
        });
        navigate("/login");
      }

    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Is json-server running?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Sign Up
        </h2>

        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-5">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            placeholder="Confirm your password"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <select
            name="role"
            value={role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline"> {/* ✅ Link instead of <a> */}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;