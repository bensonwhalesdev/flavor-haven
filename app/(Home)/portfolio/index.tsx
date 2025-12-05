import Image from "next/image";

export default function ChefProfile() {
  // Array to represent the chef's food images and their captions
  const foodGallery = [
    { src: "/food1.jpg", alt: "Signature Plate", caption: "Signature Plate" },
    { src: "/food2.jpg", alt: "Seafood Platter", caption: "Suchi" },
    { src: "/food3.jpg", alt: "Artisan Bread", caption: "Signature Plate" },
    { src: "/food4.jpg", alt: "Vegetarian Bowl", caption: "Signature Plate" },
    { src: "/food5.jpg", alt: "Dessert Tower", caption: "Efo riro" },
  ];

  // Dummy data for skills (you might want to adjust the number of filled circles)
  const culinarySkills = [
    { skill: 'Seafood', rating: 3 },
    { skill: 'Pastry', rating: 5 },
    { skill: 'Vegetarian', rating: 4 },
    { skill: 'Asian', rating: 4 },
    { skill: 'Mediterranean', rating: 5 },
    { skill: 'Healthy', rating: 5 },
  ];

  return (
    <div className="w-full min-h-screen text-gray-800 p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Left Section (Profile Info) */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center h-fit md:col-span-1 md:sticky top-8">
          <div className="w-36 h-36 rounded-full overflow-hidden mb-6 border-4 border-amber-500 shadow-lg relative">
            <Image
              src="/bomma2.jpg"
              fill
              alt="Chef Mercy Olamide"
              className="object-cover"
              sizes="144px"
              priority // FIX 1: Added priority for main image
            />
          </div>

          <h2 className="text-3xl font-extrabold text-amber-700">Mercy</h2>
          <h3 className="text-2xl font-semibold text-gray-700 -mt-1 mb-6 border-b-2 border-amber-100 pb-2">Olamide</h3>

          {/* Contact Details */}
          <div className="w-full text-left space-y-3 text-sm text-gray-600">
            <h4 className="text-lg font-bold text-amber-600 border-l-4 border-amber-500 pl-3 mb-3">Contact</h4>
            <p className="flex justify-between"><span className="font-semibold text-gray-700">Telephone:</span> +2349054103567</p>
            <p className="flex justify-between"><span className="font-semibold text-gray-700">Email:</span> hello@chefola.com</p>
            <p className="flex justify-between"><span className="font-semibold text-gray-700">Website:</span> <a href="http://www.thebommagourmet.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">thebommagourmet.com</a></p>
            <p className="flex justify-between"><span className="font-semibold text-gray-700">Location:</span> Ajah, Lagos</p>
          </div>

          <hr className="w-full border-t border-gray-200 my-6" />

          {/* Profile Summary */}
          <div className="w-full text-left">
            <h4 className="text-lg font-bold text-amber-600 border-l-4 border-amber-500 pl-3 mb-3">Professional Profile</h4>
            <p className="text-sm leading-relaxed text-gray-700">
              A passionate, dedicated, and diligent Chef with vast international experience in high-end settings. Skilled in fine dining, safety, and kitchen management. Adept in all aspects of the culinary arts, from sourcing ingredients and menu development to innovative plate presentation and flawless execution of complex dishes.
            </p>
          </div>

          <hr className="w-full border-t border-gray-200 my-6" />

          {/* References */}
          <div className="w-full text-left">
            <h4 className="text-lg font-bold text-amber-600 border-l-4 border-amber-500 pl-3 mb-3">References</h4>
            <p className="text-sm text-gray-700"><span className="font-semibold">Prof John Doe:</span> +2340000000</p>
            <p className="text-sm text-gray-700"><span className="font-semibold">Chef Jennifer Doe:</span> +23400000 | jenny@esconcierge.com</p>
          </div>
        </div>

        {/* Right Section (Experience, Gallery, Skills) */}
        <div className="md:col-span-1 lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 space-y-10">
          
          <div className="lg:hidden md:block">
            <hr className="w-full border-t border-gray-200 mb-6" />
          </div>

          {/* Food Gallery */}
          <div>
            <h3 className="text-2xl font-bold text-amber-700 mb-6 border-b pb-2">Culinary Portfolio</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {foodGallery.map((food, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform">
                  <div className="w-full aspect-square relative">
                    {/* Image Magnification on Hover */}
                    <div className="transition-transform duration-500 ease-in-out ">
                        <Image 
                          src={food.src} 
                          alt={food.alt} 
                          fill 
                          sizes="(max-width: 768px) 50vw, 20vw"
                          className="object-cover"
                          unoptimized
                        />
                    </div>
                  </div>
                  {/* Caption Overlay */}
                  <div className="absolute inset-0  bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex items-end">
                    <p className="w-full text-center text-xs font-semibold text-white py-1 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:opacity-100 opacity-0">{food.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="w-full border-t border-gray-200 my-6" />

          {/* Experience */}
          <div>
            <h3 className="text-2xl font-bold text-amber-700 mb-4 border-b pb-2">Work Experience </h3>
            <div className="space-y-6 text-base">
              {/* Experience Item 1 */}
              <div className="border-l-4 border-amber-400 pl-4">
                <p className="font-bold text-gray-800 flex justify-between items-start">
                  <span>Private Chef - Dubai & St Lucia</span>
                  <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full whitespace-nowrap">07/16-Present</span>
                </p>
                <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                  <li>Managed provisioning and cooking for high-end guests on private estates.</li>
                  <li>Designed and executed healthy, high-end, and custom-tailored cuisine.</li>
                </ul>
              </div>

              {/* Experience Item 2 */}
              <div className="border-l-4 border-amber-400 pl-4">
                <p className="font-bold text-gray-800 flex justify-between items-start">
                  <span>Head Chef - West Palm Beach</span>
                  <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full whitespace-nowrap">03/13-07/16</span>
                </p>
                <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1">
                  <li>Oversaw menu planning and food preparation for a luxury estate.</li>
                  <li>Managed the sourcing and utilization of seasonal kitchen produce.</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="w-full border-t border-gray-200 my-6" />

          {/* Education & Interests Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-amber-700 mb-4 border-b pb-2">Education</h3>
              <div className="border-l-4 border-amber-300 pl-4">
                <p className="text-base font-bold text-gray-800">BA in Culinary Arts</p>
                <p className="text-sm font-semibold text-amber-600">Oakland College</p>
                <p className="text-sm text-gray-600">London, United Kingdom (2008-2012)</p>
              </div>
            </div>

            {/* Interests */}
            <div>
              <h3 className="text-2xl font-bold text-amber-700 mb-4 border-b pb-2">Interests</h3>
              <p className="text-base text-gray-700">
                Exploring global food trends, dedicated reading on history and culture, playing and listening to music, learning foreign languages, and water sports.
              </p>
            </div>
          </div>

          <hr className="w-full border-t border-gray-200 my-6" />

          {/* Culinary Skills */}
          <div>
            <h3 className="text-2xl font-bold text-amber-700 mb-4 border-b pb-2">Culinary Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {culinarySkills.map(({ skill, rating }) => (
                <div key={skill} className="flex items-center justify-between bg-amber-50 p-3 rounded-xl shadow-inner border border-amber-200">
                  <span className="font-medium text-gray-800">{skill}</span>
                  <span className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-3 h-3 rounded-full ${star <= rating ? 'bg-amber-500' : 'bg-gray-300'}`}
                        title={`${skill} rating: ${rating}/5`}
                      ></div>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}