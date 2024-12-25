import { useState, useMemo } from "react";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
  Users,
  Star,
  MapPin,
  Globe,
} from "lucide-react";
import { Destination, tourGuides, addBookedTour } from "../database/data";
import { Link, useNavigate } from "react-router-dom";

export default function DestinationList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "images" | "reviews">(
    "info"
  );
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [showGuideInfo, setShowGuideInfo] = useState(false);

  const allDestinations = useMemo(() => {
    return tourGuides.flatMap((guide) => guide.tours);
  }, []);

  const filteredDestinations = useMemo(() => {
    return allDestinations.filter((dest) =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allDestinations, searchTerm]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const currentDestinations = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, filteredDestinations, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNow = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
    setActiveTab("info");
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    window.open("https://m.me/TourMateVn");
    return;
    // if (selectedDestination) {
    //   const guide = tourGuides.find(
    //     (g) => g.id === selectedDestination.guideId
    //   );
    //   if (guide) {
    //     const newBookedTour = {
    //       id: Date.now(), // Use a more robust ID generation in production
    //       destination: selectedDestination.name,
    //       image: selectedDestination.image,
    //       startDate: bookingInfo.checkIn,
    //       endDate: bookingInfo.checkOut,
    //       status: "Upcoming" as const,
    //       tourGuide: guide,
    //       duration: selectedDestination.duration,
    //       price: selectedDestination.price,
    //     };
    //     addBookedTour(newBookedTour);
    //     setShowModal(false);
    //     alert("Tour booked successfully!");
    //     navigate("/booked-tours"); // Redirect to booked tours page
    //   }
    // }
  };

  const handleViewTourGuide = (destination: Destination) => {
    setSelectedDestination(destination);
    setShowGuideInfo(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="container mx-auto my-8">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 w-64 border rounded"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select className="border rounded px-4 py-2">
              <option>Default Sorting</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentDestinations.map((dest) => (
              <div
                key={dest.id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{dest.name}</h2>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({dest.rating} Rating)
                    </span>
                  </div>
                  <p className="text-lg font-bold mb-2">
                    {dest.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    <span className="text-sm font-normal">/Person</span>
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{dest.duration} Days</span>
                    <button
                      style={{ backgroundColor: "var(--bright-navy-blue)" }}
                      className=" text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                      onClick={() => handleBookNow(dest)}
                    >
                      Book Now <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  <Link
                    to="#"
                    className="text-blue-600 hover:underline"
                    onClick={() => handleViewTourGuide(dest)}
                  >
                    View Tour Guide
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            <button
              className={`px-4 py-2 rounded text-sm flex items-center ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`px-4 py-2 rounded text-sm ${
                      pageNumber === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <span key={pageNumber} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <button
              className={`px-4 py-2 rounded text-sm flex items-center ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Get Updated The Latest Newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter Email"
                className="px-4 py-2 rounded-l-md w-full"
              />
              <button className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Tour Booking Now
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <p>789 Main St, Anytown, CA 12345, USA</p>
            <p>support@tourm.com</p>
            <p>+1 234 567 890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Instagram Post</h3>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-teal-700 h-20 w-20"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-teal-700 text-center">
          <p>&copy; 2024 Tourm. All Rights Reserved.</p>
        </div>
      </footer>

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
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
              </nav>
            </div>
            <div className="p-6">
              {activeTab === "info" && (
                <>
                  <p className="text-gray-600 mb-4">
                    Immerse yourself in the romance of{" "}
                    {selectedDestination.name} and the beauty of its
                    countryside.
                  </p>
                  <div className="flex items-center mb-4">
                    <Link to={`/tourguilders/${tourGuides[0].id}`}>
                      <img
                        src={tourGuides[0].avatar}
                        alt={tourGuides[0].name}
                        className="rounded-full w-12 h-12 mr-3 cursor-pointer"
                      />
                    </Link>
                    <div>
                      <p className="font-semibold">Tour Guide</p>
                      <Link
                        to={`/tourguilders/${tourGuides[0].id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {tourGuides[0].name}
                      </Link>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitBooking}>
                    {/* <div className="mb-4">
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
                    </div> */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
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
                      src={require(`../images/gallery-${index + 1}.jpg`)}
                      alt={`${selectedDestination.name} Image ${index + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div>
                  <h3 className="font-semibold mb-4">Customer Reviews</h3>
                  {selectedDestination.reviews &&
                  selectedDestination.reviews.length > 0 ? (
                    selectedDestination.reviews.map((review, index) => (
                      <div key={index} className="mb-4 border-b pb-4">
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {review.rating} out of 5
                          </span>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet for this destination.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showGuideInfo && selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Tour Guide Information</h2>
              <button
                onClick={() => setShowGuideInfo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {tourGuides.find((g) => g.id === selectedDestination.guideId) && (
                <div>
                  <div className="flex items-center mb-4">
                    <img
                      src={
                        tourGuides.find(
                          (g) => g.id === selectedDestination.guideId
                        )!.avatar
                      }
                      alt="Tour Guide"
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {
                          tourGuides.find(
                            (g) => g.id === selectedDestination.guideId
                          )!.name
                        }
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>
                          {
                            tourGuides.find(
                              (g) => g.id === selectedDestination.guideId
                            )!.rating
                          }{" "}
                          (
                          {
                            tourGuides.find(
                              (g) => g.id === selectedDestination.guideId
                            )!.totalReviews
                          }{" "}
                          reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {
                        tourGuides.find(
                          (g) => g.id === selectedDestination.guideId
                        )!.location
                      }
                    </p>
                    <p className="flex items-center mb-2">
                      <Globe className="h-4 w-4 mr-2" />
                      Languages:{" "}
                      {tourGuides
                        .find((g) => g.id === selectedDestination.guideId)!
                        .languages.join(", ")}
                    </p>
                    <p className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {
                        tourGuides.find(
                          (g) => g.id === selectedDestination.guideId
                        )!.totalTrips
                      }{" "}
                      trips conducted
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Specialties:</h4>
                    <div className="flex flex-wrap">
                      {tourGuides
                        .find((g) => g.id === selectedDestination.guideId)!
                        .specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                          >
                            {specialty}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/tourguilders/${selectedDestination.guideId}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      View Full Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
