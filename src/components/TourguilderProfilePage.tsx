import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Calendar, Users, ChevronRight, X } from "lucide-react";
import {
  TourGuide,
  Destination,
  tourGuides,
  addBookedTour,
} from "../database/data";

export default function TourguilderProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [tourGuide, setTourGuide] = useState<TourGuide | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  useEffect(() => {
    const guide = tourGuides.find((g) => g.id === parseInt(id || "0"));
    if (guide) {
      setTourGuide(guide);
    }
  }, [id]);

  const handleBookNow = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
    setActiveTab("info");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDestination && tourGuide) {
      const newBookedTour = {
        id: Date.now(), // Use a more robust ID generation in production
        destination: selectedDestination.name,
        image: selectedDestination.image,
        startDate: bookingInfo.checkIn,
        endDate: bookingInfo.checkOut,
        status: "Upcoming" as const,
        tourGuide: tourGuide,
        duration: selectedDestination.duration,
        price: selectedDestination.price,
      };
      addBookedTour(newBookedTour);
      setShowModal(false);
      alert("Tour booked successfully!");
      navigate("/booked-tours"); // Redirect to booked tours page
    }
  };

  if (!tourGuide) {
    return <div>Tour guide not found</div>;
  }

  return (
    <>
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center text-white bg-black bg-opacity-70 bg-blend-overlay h-[180px] pt-[125px] text-center"
        style={{
          backgroundImage: `url(${require("../images/hero-banner.jpg")})`,
        }}
      ></section>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={tourGuide.avatar}
                alt={tourGuide.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">
                {tourGuide.name}
              </div>
              <p className="mt-2 text-gray-500">{tourGuide.bio}</p>
              <div className="mt-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 font-bold">{tourGuide.rating}</span>
                <span className="ml-1 text-gray-500">
                  ({tourGuide.totalReviews} reviews)
                </span>
              </div>
              <div className="mt-2 text-gray-500">
                {tourGuide.totalTrips} guided tours
              </div>
              <div className="mt-2 text-gray-500">
                Languages: {tourGuide.languages.join(", ")}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">
          Destinations by {tourGuide.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tourGuide.tours.map((destination) => (
            <div
              key={destination.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                className="h-48 w-full object-cover"
                src={destination.image}
                alt={destination.name}
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{destination.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{destination.duration} days</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Max {destination.maxGroupSize} people</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>France</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {destination.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  <button
                    onClick={() => handleBookNow(destination)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                  >
                    Book Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedDestination && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-bold">
                  Book Your Trip to {selectedDestination.name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="border-b">
                <nav className="flex">
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "info"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("info")}
                  >
                    Info
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "images"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("images")}
                  >
                    Images
                  </button>
                </nav>
              </div>
              <div className="p-6">
                {activeTab === "info" && (
                  <>
                    <p className="text-gray-600 mb-4">
                      Immerse yourself in the beauty of{" "}
                      {selectedDestination.name} with our expert guide,{" "}
                      {tourGuide.name}.
                    </p>
                    <div className="flex items-center mb-4">
                      <img
                        src={tourGuide.avatar}
                        alt={tourGuide.name}
                        className="rounded-full w-12 h-12 mr-3"
                      />
                      <div>
                        <p className="font-semibold">Tour Guide</p>
                        <p className="text-blue-600">{tourGuide.name}</p>
                      </div>
                    </div>
                    <form onSubmit={handleSubmitBooking}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={bookingInfo.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="check-in"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Check-in
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="check-in"
                            name="checkIn"
                            value={bookingInfo.checkIn}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md pl-10"
                            required
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="check-out"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Check-out
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="check-out"
                            name="checkOut"
                            value={bookingInfo.checkOut}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md pl-10"
                            required
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="guests"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Guests
                        </label>
                        <div className="relative">
                          <select
                            id="guests"
                            name="guests"
                            value={bookingInfo.guests}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md appearance-none pl-10"
                          >
                            {[...Array(selectedDestination.maxGroupSize)].map(
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </select>
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Book for{" "}
                        {selectedDestination.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </button>
                    </form>
                  </>
                )}
                {activeTab === "images" && (
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <img
                        key={index}
                        src={`/placeholder.svg?height=150&width=200&text=Image ${
                          index + 1
                        }`}
                        alt={`${selectedDestination.name} Image ${index + 1}`}
                        className="w-full h-auto rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
