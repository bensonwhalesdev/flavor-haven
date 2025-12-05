import { ChefHat } from "lucide-react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section
      className="relative w-full py-28 md:py-32 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Background dotted pattern */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f5c6a5 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      ></div>

      {/* CONTENT */}
      <div className="relative w-[90%] max-w-5xl mx-auto text-center">

        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#CF470C]/30 px-4 py-2 rounded-full mb-6 shadow-sm">
          <BsStars className="text-[#CF470C] w-5 h-5" />
          <span className="text-sm font-medium text-[#CF470C]">
            Share Your Culinary Creations
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6 leading-tight">
          Thebomma Gourmet
        </h1>

        {/* Subtext */}
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Discover, share, and celebrate recipes from around the world.
          Join our community of food lovers and culinary enthusiasts.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          {/* Browse Recipes */}
          <Link href="/browse">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#CF470C] text-white text-lg rounded-lg shadow-md hover:bg-[#b93f0b] transition cursor-pointer">
            <FiBookOpen size={20} />
            Browse Recipes
          </button>
          </Link>

          {/* Share Recipe */}
          <Link href="/share">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border text-lg rounded-lg shadow-md hover:bg-green-300 transition cursor-pointer">
            <ChefHat size={20} />
            Share Your Recipe
          </button>
          </Link>
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              10k+
            </h3>
            <p className="text-gray-200 text-sm">Recipes</p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              50k+
            </h3>
            <p className="text-gray-200 text-sm">Food Lovers</p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              100+
            </h3>
            <p className="text-gray-200 text-sm">Cuisines</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
