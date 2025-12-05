import { GiRoyalLove } from "react-icons/gi";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { RiUserCommunityFill } from "react-icons/ri";

const WhyChoose = () => {
  return (
    <section className="w-full py-5">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose Thebomma Gourmet?
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Everything you need to discover, create, and share amazing recipes
        </p>
      </div>

      {/* Cards */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer">
          <PiMagnifyingGlassDuotone className="text-5xl text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Smart Search
          </h3>
          <p className="mt-2 text-gray-600">
            Find the perfect recipe with our intelligent search. Filter by
            cuisine, ingredients, or cooking time.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer">
          <GiRoyalLove className="text-5xl text-pink-600 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Save Favorites
          </h3>
          <p className="mt-2 text-gray-600">
            Like and save your favorite recipes. Build your personal cookbook
            for quick access anytime.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 cursor-pointer">
          <RiUserCommunityFill className="text-5xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />
          <h3 className="mt-6 text-xl font-semibold text-gray-900">
            Community
          </h3>
          <p className="mt-2 text-gray-600">
            Connect with food lovers worldwide. Share tips, comment, and learn
            from each other's experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
