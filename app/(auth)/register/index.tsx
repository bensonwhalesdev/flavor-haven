"use client";

import { useState } from "react";
import { useRegister } from "../Hooks/useRegister";
import { RegisterInput } from "../Types/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const Register = () => {
  const { register, loading, error } = useRegister();

  const [form, setForm] = useState<RegisterInput>({
    firstname: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center px-4 py-10 
      bg-gradient-to-br from-[#1e0625] to-[#3c0f20] relative overflow-hidden"
    >
      {/* Decorative Overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('/hero.webp')] bg-cover bg-center" />

      {/* Container */}
      <div
        className="relative w-full max-w-6xl bg-white/5 backdrop-blur-lg rounded-3xl 
      shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* LEFT SIDE */}
        <div
          className="flex-1 p-10 md:p-14 text-white flex flex-col justify-center 
        animate-fadeIn"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Welcome to Flavor Haven!
          </h1>

          <p className="text-sm md:text-base text-white/80 max-w-md mb-8">
            Join a growing community of chefs, food lovers, and recipe
            explorers. Create your account and begin your culinary journey
            today.
          </p>

          <Link href={"/"}>
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#CF470C] to-[#ff7b47] 
          rounded-lg shadow hover:scale-105 cursor-pointer transition w-fit"
            >
              Home
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div
          className="flex-1 bg-white/10 backdrop-blur-xl p-10 md:p-14 
        animate-slideUp"
        >
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-white"
          >
            {/* Firstname */}
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 bg-white/20 rounded-lg outline-none 
                border border-white/20 focus:border-[#CF470C] transition"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/20 rounded-lg outline-none 
                border border-white/20 focus:border-[#CF470C] transition"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/20 rounded-lg outline-none 
                  border border-white/20 focus:border-[#CF470C] transition"
                  required
                />

                {/* Show / Hide */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 
                  hover:text-white transition"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#CF470C] 
              to-[#ff7b47] font-semibold text-white shadow hover:scale-[1.02] 
              transition disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
            <div className="text-center text-white/80 text-sm mt-2">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#ff7b47] font-semibold hover:text-[#CF470C] transition underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">
                {error.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
