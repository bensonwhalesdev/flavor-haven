"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../Hook/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <nav className="w-[95%] max-w-6xl mx-auto flex justify-between items-center py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logoo.jpg"
            alt="logo"
            width={45}
            height={45}
            className="rounded-md cursor-pointer"
          />
          <h1 className="text-xl font-semibold text-[#CF470C] tracking-wide">
            Thebomma_gourmet
          </h1>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

          <Link href={'/browse'}>
          <button className="px-4 py-2 rounded-md hover:bg-green-400 hover:text-white cursor-pointer transition">
            Browse Recipes
          </button>
          </Link>

          <Link href="/share">
            <button className="px-4 py-2 rounded-md hover:bg-green-400 hover:text-white cursor-pointer transition">
              Share Recipe
            </button>
          </Link>

          {/* If logged in */}
          {user ? (
            <div className="flex items-center gap-4">

              {/* Greeting */}
              <p className="text-gray-700 font-medium">
                Hi, <span className="text-[#CF470C] font-semibold">{user.firstname}</span>
              </p>

              {/* Favorites button */}
              {/* <Link href="/favorites">
                <button className="px-4 py-2 rounded-md flex items-center gap-2 text-[#CF470C] hover:bg-green-400 hover:text-white cursor-pointer transition">
                  <FaHeart size={16} />
                  Favorites
                </button>
              </Link> */}

              {/* Sign out */}
              <button
                onClick={logout}
                className="px-4 py-2 bg-[#CF470C] text-white rounded-md flex items-center gap-2 hover:bg-[#b93f0b] cursor-pointer transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 rounded-md bg-[#CF470C] text-white flex items-center gap-2 hover:bg-[#b93f0b] cursor-pointer transition">
                <FaUser size={16} />
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-3xl text-[#CF470C]"
        >
          <HiMenu />
        </button>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-[60] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-3xl text-[#CF470C]">
            <HiX />
          </button>
        </div>

        <ul className="flex flex-col px-6 space-y-4 mt-4">

          <li>
            <Link href='/browse'>
            <button className="w-full text-left py-2 px-2 text-lg rounded-md hover:bg-green-200 transition">
              Browse Recipes
            </button>
            </Link>
          </li>

          <li>
            <Link href="/share">
            <button className="w-full text-left py-2 px-2 text-lg rounded-md hover:bg-green-200 transition">
              Share Recipe
            </button>
            </Link>
          </li>

          {user ? (
            <>
              <p className="text-lg font-medium text-gray-800">
                Hi, <span className="text-[#CF470C]">{user.firstname}</span>
              </p>

              {/* <Link href="/favorites">
                <button className="w-full flex items-center gap-3 py-2 px-2 rounded-md hover:bg-orange-100 transition">
                  <FaHeart size={18} className="text-[#CF470C]" />
                  Favorites
                </button>
              </Link> */}

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 py-2 px-2 rounded-md bg-[#CF470C] text-white hover:bg-[#b93f0b] transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="w-full flex items-center gap-3 py-2 px-4 bg-[#CF470C] text-white rounded-md hover:bg-[#b93f0b] transition">
                <FaUser size={18} />
                Sign In
              </button>
            </Link>
          )}
        </ul>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
