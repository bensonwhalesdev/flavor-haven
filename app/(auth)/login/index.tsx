"use client";

import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { LoginInput } from "../Types/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const Login = () => {
  const { login, loading, error } = useLogin();

  const [form, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form);
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
            Welcome Back!
          </h1>

          <p className="text-sm md:text-base text-white/80 max-w-md mb-8">
            Log in to continue exploring, sharing and saving your favorite
            recipes in Flavor Haven.
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

        {/* RIGHT - FORM */}
        <div
          className="flex-1 bg-white/10 backdrop-blur-xl p-10 md:p-14 
        animate-slideUp"
        >
          <h2 className="text-3xl font-semibold text-white text-center mb-8">
            Login to Your Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-white"
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
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

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#CF470C] 
              to-[#ff7b47] font-semibold text-white shadow hover:scale-[1.02] 
              transition disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-white/80 text-sm mt-2">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#ff7b47] font-semibold hover:text-[#CF470C] transition underline-offset-4 hover:underline"
                >
                  Register
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

export default Login;
