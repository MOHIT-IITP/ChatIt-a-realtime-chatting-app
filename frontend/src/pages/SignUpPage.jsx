import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isSigningIn, signup } = useAuthStore();

  // Form Validation
  const validateForm = () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim()) return toast.error("Full name is required.");
    if (!email.trim()) return toast.error("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email))
      return toast.error("Invalid email format.");
    if (!password) return toast.error("Password is required.");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    return true;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen  ">
      <form
        onSubmit={handleSubmit}
        className="w-[30rem] py-20 max-w-xl bg-white shadow-lg p-8 rounded-3xl"
      >
        <h2 className="text-5xl text-primary font-bold text-center  mb-6">
          Sign Up
        </h2>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full  text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="abc@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <div className="flex items-center border rounded-xl px-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full text-black px-4 py-2 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-eye-closed-icon lucide-eye-closed"
                >
                  <path d="m15 18-.722-3.25" />
                  <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                  <path d="m20 15-1.726-2.05" />
                  <path d="m4 15 1.726-2.05" />
                  <path d="m9 18 .722-3.25" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-eye-icon lucide-eye"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSigningIn}
          className={`w-full py-2 px-4 rounded-xl text-white font-bold transition-all ${
            isSigningIn
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-neutral-500 hover:bg-neutral-600"
          }`}
        >
          {isSigningIn ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
