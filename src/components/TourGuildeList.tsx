import { useState } from "react";
import { Star, MapPin, ChevronRight } from "lucide-react";
import { TourGuide, tourGuides } from "../database/data";
import { Link } from "react-router-dom";

export default function TourGuideList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuides = tourGuides.filter(
    (guide) =>
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center text-white bg-black bg-opacity-70 bg-blend-overlay h-[180px] pt-[125px] text-center"
        style={{
          backgroundImage: `url(${require("../images/hero-banner.jpg")})`,
        }}
      ></section>
      <br />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Our Tour Guides</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search guides by name, location, or specialty..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Link to={`/tourguilders/${guide.id}`}>
                    <img
                      className="h-48 w-full object-cover md:w-48 cursor-pointer"
                      src={guide.avatar}
                      alt={guide.name}
                    />
                  </Link>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                        {guide.name}
                      </div>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-gray-500 text-sm">
                          {guide.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 font-bold">{guide.rating}</span>
                      <span className="ml-1 text-gray-500">
                        ({guide.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-500">
                    {guide.totalTrips} trips created
                  </p>
                  <div className="mt-2 text-gray-500">
                    Languages: {guide.languages.join(", ")}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap mt-1">
                      {guide.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/tourguilders/${guide.id}`}
                  className="p-4 flex items-center justify-center md:justify-end"
                >
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No tour guides found matching your search.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
