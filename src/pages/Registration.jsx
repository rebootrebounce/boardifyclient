import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const InitialState = {
  email: "",
  username: "",
  password: "",
  role: "",
};

const Registration = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(InitialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      toast.success(res.data.message)
      navigate('/login')
    } catch (error){
      toast.error(error.response.data.message)
      console.error(error)
    }
    // Perform registration logic here
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 p-8 rounded-lg shadow-lg bg-white space-y-6"
      >
        <p><span className="text-3xl font-bold text-indigo-600">Boardify </span><span className="text-lg">Registration Form</span></p>

        <label className="flex flex-col w-full">
          <span className="text-sm font-medium text-gray-600">Name</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="flex flex-col w-full">
          <span className="text-sm font-medium text-gray-600">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="flex flex-col w-full">
          <span className="text-sm font-medium text-gray-600">Role</span>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
        </label>

        <label className="flex flex-col w-full">
          <span className="text-sm font-medium text-gray-600">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
        <div>
            <span>Already have an Account ? </span><span><Link to="/" className="text-indigo-600 hover:underline">Back to login</Link></span>
        </div>
        
      </form>
    </div>
  );
};

export default Registration;
