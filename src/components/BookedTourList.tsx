import React, { useState, useEffect } from "react";
import { Star, X, User, Calendar, MapPin } from "lucide-react";
import {
  BookedTour,
  bookedTours as initialBookedTours,
  updateBookedTourReview,
  TourGuide,
  tourGuides,
} from "../database/data";
import { Link } from "react-router-dom";

export default function BookedTourList() {
  const [bookedTours, setBookedTours] =
    useState<BookedTour[]>(initialBookedTours);
  const [selectedTour, setSelectedTour] = useState<BookedTour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState({ text: "", rating: 0 });
  const [activeTab, setActiveTab] = useState<"info" | "review" | "allReviews">(
    "info"
  );

  useEffect(() => {
    const currentDate = new Date();
    const updatedTours = bookedTours.map((tour) => {
      const startDate = new Date(tour.startDate);
      const endDate = new Date(tour.endDate);
      let newStatus: BookedTour["status"] = tour.status;

      if (currentDate < startDate) {
        newStatus = "Upcoming";
      } else if (currentDate >= startDate && currentDate <= endDate) {
        newStatus = "In Progress";
      } else {
        newStatus = "Completed";
      }

      return { ...tour, status: newStatus };
    });

    setBookedTours(updatedTours);
  }, []);

  const openModal = (tour: BookedTour) => {
    setSelectedTour(tour);
    setReview(tour.review || { text: "", rating: 0 });
    setIsModalOpen(true);
    setActiveTab("info");
  };

  const closeModal = () => {
    setSelectedTour(null);
    setIsModalOpen(false);
  };

  const submitReview = () => {
    if (selectedTour) {
      updateBookedTourReview(selectedTour.id, review);
      const updatedTours = bookedTours.map((tour) =>
        tour.id === selectedTour.id ? { ...tour, review } : tour
      );
      setBookedTours(updatedTours);
      setSelectedTour({ ...selectedTour, review });
      closeModal();
    }
  };

  const findTourGuideById = (id: number): TourGuide | undefined => {
    return tourGuides.find((guide) => guide.id === id);
  };

  const findTourReviews = (
    tourName: string
  ): Array<{ rating: number; text: string }> => {
    const guide = tourGuides.find((g) =>
      g.tours.some((t) => t.name === tourName)
    );
    if (guide) {
      const tour = guide.tours.find((t) => t.name === tourName);
      return tour?.reviews || [];
    }
    return [];
  };

  return (
    <>
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center text-white bg-black bg-opacity-70 bg-blend-overlay h-[180px] pt-[125px] text-center"
        style={{
          backgroundImage: `url(${require("../images/hero-banner.jpg")})`,
        }}
      ></section>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">My Booked Tours</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => openModal(tour)}
            >
              <img
                src={tour.image}
                alt={tour.destination}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {tour.destination}
                </h2>
                <p className="text-gray-600 mb-2">
                  {tour.startDate} - {tour.endDate}
                </p>
                <p
                  className={`font-semibold ${
                    tour.status === "Upcoming"
                      ? "text-blue-500"
                      : tour.status === "In Progress"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {tour.status}
                </p>
                <div className="flex items-center mt-2">
                  <img
                    src={tour.tourGuide.avatar}
                    alt={tour.tourGuide.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    {tour.tourGuide.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedTour && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  {selectedTour.destination}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "info"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("info")}
                >
                  Tour Info
                </button>
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "review"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("review")}
                >
                  Your Review
                </button>
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "allReviews"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("allReviews")}
                >
                  All Reviews
                </button>
              </div>
              <div className="p-6">
                {activeTab === "info" && (
                  <div>
                    <p className="text-gray-600 mb-4">
                      {selectedTour.startDate} - {selectedTour.endDate}
                    </p>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Status:{" "}
                        <span
                          className={`${
                            selectedTour.status === "Upcoming"
                              ? "text-blue-500"
                              : selectedTour.status === "In Progress"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        >
                          {selectedTour.status}
                        </span>
                      </h3>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Tour Guide:</h3>
                      <div className="flex items-center">
                        <Link to={`/tourguilders/${selectedTour.tourGuide.id}`}>
                          <img
                            src={selectedTour.tourGuide.avatar}
                            alt={selectedTour.tourGuide.name}
                            className="w-12 h-12 rounded-full mr-3 cursor-pointer"
                          />
                        </Link>
                        <Link
                          to={`/tourguilders/${selectedTour.tourGuide.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {selectedTour.tourGuide.name}
                        </Link>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Tour Details:</h3>
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{selectedTour.duration} days</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                        <span>{selectedTour.tourGuide.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg">
                          ${selectedTour.price}
                        </span>
                        <span className="text-gray-500 ml-1">per person</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "review" && (
                  <div>
                    {selectedTour.review ? (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Your Review:</h3>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= selectedTour.review!.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">
                          {selectedTour.review.text}
                        </p>
                      </div>
                    ) : (
                      <p className="mb-4">
                        You haven't reviewed this tour yet.
                      </p>
                    )}
                    <h3 className="font-semibold mb-2">
                      {selectedTour.review
                        ? "Edit Your Review:"
                        : "Add Your Review:"}
                    </h3>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          onClick={() =>
                            setReview((prev) => ({ ...prev, rating: star }))
                          }
                        />
                      ))}
                    </div>
                    <textarea
                      value={review.text}
                      onChange={(e) =>
                        setReview((prev) => ({ ...prev, text: e.target.value }))
                      }
                      className="w-full p-2 border rounded mb-4"
                      rows={4}
                      placeholder="Write your review here..."
                    ></textarea>
                    <button
                      onClick={submitReview}
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                      {selectedTour.review ? "Update Review" : "Submit Review"}
                    </button>
                  </div>
                )}
                {activeTab === "allReviews" && (
                  <div>
                    <h3 className="font-semibold mb-4">
                      All Reviews for this Tour
                    </h3>
                    {findTourReviews(selectedTour.destination).length > 0 ? (
                      findTourReviews(selectedTour.destination).map(
                        (review, index) => (
                          <div
                            key={index}
                            className="mb-4 pb-4 border-b last:border-b-0"
                          >
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
                        )
                      )
                    ) : (
                      <p>No reviews available for this tour yet.</p>
                    )}
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
