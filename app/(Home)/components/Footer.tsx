import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#fff5ef] pt-16 pb-6 border-t border-[#f3cbb3]">

      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" width={45} height={45} alt="logo" className="rounded-md" />
            <h2 className="text-2xl font-bold text-[#CF470C]">Flavor Haven</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            Discover, create and share delicious recipes from around the world.
            Join our community of passionate cooks.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-[#CF470C] hover:text-white transition-all cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-4 animate-fadeInUp">
          <h4 className="text-lg font-semibold text-[#CF470C]">Explore</h4>
          <ul className="space-y-3 text-gray-700">
            <li className="hover:text-[#CF470C] transition cursor-pointer">Browse Recipes</li>
            <li className="hover:text-[#CF470C] transition cursor-pointer">Share Recipe</li>
            <li className="hover:text-[#CF470C] transition cursor-pointer">Top Rated</li>
            <li className="hover:text-[#CF470C] transition cursor-pointer">Cuisines</li>
          </ul>
        </div>

        {/* COMMUNITY */}
        <div className="space-y-4 animate-fadeInUp">
          <h4 className="text-lg font-semibold text-[#CF470C]">Community</h4>
          <ul className="space-y-3 text-gray-700">
            <li className="hover:text-[#CF470C] transition cursor-pointer">Join Us</li>
            <li className="hover:text-[#CF470C] transition cursor-pointer">Creators</li>
            <li className="hover:text-[#CF470C] transition cursor-pointer">Blog</li>
            <li className="hover:text-[#CF470C] transition cursor-pointer">Support</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="space-y-4 animate-fadeInUp">
          <h4 className="text-lg font-semibold text-[#CF470C]">Newsletter</h4>
          <p className="text-gray-700 text-sm">Get weekly recipe inspiration in your inbox.</p>

          <form className="flex items-center gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CF470C]"
            />
            <button className="px-4 py-2 bg-[#CF470C] text-white rounded-lg hover:bg-[#b93f0b] transition">
              Join
            </button>
          </form>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-600 text-sm mt-12 pt-6 border-t border-[#f3cbb3]">
        © {new Date().getFullYear()} Flavor Haven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
