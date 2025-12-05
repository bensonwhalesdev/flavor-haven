import Image from "next/image";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";

const Ready = () => {
  return (
    <section className="w-full py-20">
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div
          className="space-y-6 animate-fadeInUp"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FFF1E8] shadow-md">
            <FaArrowTrendUp className="text-[#CF470C] text-3xl" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#CF470C] leading-tight">
            Ready to Start Cooking?
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-lg md:text-xl max-w-lg">
            Join thousands of home cooks and professional chefs sharing their
            passion for food.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Explore Button */}
            <Link href="/browse">
            <button className="px-6 py-3 bg-[#CF470C] text-white font-medium rounded-lg shadow-md hover:bg-[#b93f0b] transition-all duration-300 transform hover:-translate-y-1">
              Explore Recipes
            </button>
            </Link>

            {/* Upload Button */}
            <Link href="/share">
            <button className="px-6 py-3 bg-white border font-medium rounded-lg shadow-md hover:bg-green-300 transition-all duration-300 transform hover:-translate-y-1">
              Upload Your First Recipe
            </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end animate-fadeIn">
          <Image
            src="/ready.webp"
            alt="ready-img"
            width={500}
            height={500}
            className="rounded-2xl shadow-lg w-full max-w-sm md:max-w-md object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Ready;
