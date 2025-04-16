import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { isLoggingIn, login } = useAuthStore();

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Enter Email");
        if (!formData.password) return toast.error("Enter Password");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid Email format");
        return true;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateForm()) {
            login(formData);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-3xl -mt-30 shadow-xl py-20 w-96">
                <h2 className="text-6xl mb-20 font-bold text-center text-neutral-700 "
                style={{
                    fontFamily: "Poppins"
                }}
                >
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <label className="text-black" htmlFor=""> Email</label>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full bg-neutral-200 text-black focus:outline-none px-4 py-2 rounded-xl  focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-black" htmlFor=""> Password</label>
                        <div className="flex text-black bg-neutral-200 rounded-xl">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="w-full px-4 py-2 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-center  text-gray-500"
                            >
                                {showPassword ? (
                                    <div className="px-4">

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
                                            class="lucide lucide-eye-closed-icon lucide-eye-closed "
                                        >
                                            <path d="m15 18-.722-3.25" />
                                            <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                                            <path d="m20 15-1.726-2.05" />
                                            <path d="m4 15 1.726-2.05" />
                                            <path d="m9 18 .722-3.25" />
                                        </svg>
                                    </div>
                                ) : (
                                        <div className="px-4">

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
                                        </div>
                                    )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-neutral-500  flex justify-center items-center  text-white  py-2 px-4 rounded-xl hover:bg-neutral-600 font-bold transition duration-300"
                    >
                        {isLoggingIn ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6 animate-spin"
                            >
                                <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
                            </svg>
                        ) : (
                                "Login"
                            )}
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className=" font-bold text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
