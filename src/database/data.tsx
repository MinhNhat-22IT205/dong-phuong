export interface TourGuide {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  totalTrips: number;
  languages: string[];
  location: string;
  specialties: string[];
  bio?: string;
  tours: Destination[];
}

export interface Destination {
  id: number;
  name: string;
  image: string;
  rating?: number;
  price: number;
  duration: number;
  maxGroupSize?: number;
  reviews?: Array<{ rating: number; text: string }>;
  guideId: number;
}

export interface BookedTour {
  id: number;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  status: "Upcoming" | "In Progress" | "Completed";
  review?: {
    text: string;
    rating: number;
  };
  tourGuide: TourGuide;
  duration: number;
  price: number;
}

export const tourGuides: TourGuide[] = [
  {
    id: 1,
    name: "Tan Dinh Nguyen",
    avatar:
      "https://vnn-imgs-f.vgcloud.vn/2021/03/01/17/giai-phap-tang-chat-luong-hoc-truc-tuyen-cho-tre-tieu-hoc-7.jpg",
    rating: 4.8,
    totalReviews: 120,
    totalTrips: 50,
    languages: ["Vietnamese", "English", "French"],
    location: "Hanoi, Vietnam",
    specialties: ["Cultural Tours", "Historical Sites", "Street Food"],
    bio: "Experienced guide with a passion for sharing Vietnam's rich history and culture.",
    tours: [
      {
        id: 1,
        name: "Hanoi Old Quarter Walk",
        image:
          "https://adventurejourney.vn/upload/image/news/old-quarter-hanoi.jpg",
        rating: 4.9,
        price: 300000,
        duration: 1,
        maxGroupSize: 10,
        reviews: [
          {
            rating: 5,
            text: "Minh's knowledge of Hanoi's history is impressive!",
          },
          {
            rating: 4,
            text: "Great tour, but it was quite crowded in some areas.",
          },
        ],
        guideId: 1,
      },
      {
        id: 2,
        name: "Halong Bay Cruise",
        image:
          "https://www.pelago.co/img/products/VN-Vietnam/standard-cruise-halong-bay-1-day-trip-from-hanoi-by-expressway/3d573897-7ece-449b-84ef-6d4bcf5b0d46_standard-cruise-halong-bay-1-day-trip-from-hanoi-by-expressway-medium.jpg",
        rating: 4.8,
        price: 800000,
        duration: 2,
        maxGroupSize: 20,
        reviews: [
          {
            rating: 5,
            text: "Breathtaking views and excellent service on the cruise.",
          },
          {
            rating: 5,
            text: "Minh made sure we had an unforgettable experience.",
          },
        ],
        guideId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Nguyen Cao Mai",
    avatar:
      "https://tinhdoan.caobang.gov.vn/uploads/news/2023_05/nu-sinh-vien-nguoi-san-diu-het-minh-voi-mau-ao-xanh.jpg",
    rating: 4.9,
    totalReviews: 95,
    totalTrips: 40,
    languages: ["Vietnamese", "English", "Japanese"],
    location: "Ho Chi Minh City, Vietnam",
    specialties: ["City Tours", "War History", "Local Cuisine"],
    tours: [
      {
        id: 3,
        name: "Cu Chi Tunnels Tour",
        image: "https://statics.vinpearl.com/cu-chi-tunnels-8_1689392552.jpg",
        rating: 4.9,
        price: 450000,
        duration: 1,
        maxGroupSize: 15,
        reviews: [
          {
            rating: 5,
            text: "Lan's insights into the war history were eye-opening.",
          },
          {
            rating: 4,
            text: "Informative tour, but the tunnels can be claustrophobic.",
          },
        ],
        guideId: 2,
      },
      {
        id: 4,
        name: "Mekong Delta Exploration",
        image:
          "https://adventurejourney.vn/upload/image/mekongdelta/mekong-river-delta.jpg",
        rating: 4.7,
        price: 600000,
        duration: 1,
        maxGroupSize: 12,
        reviews: [
          {
            rating: 5,
            text: "The boat ride through the Mekong was so peaceful.",
          },
          {
            rating: 4,
            text: "Loved the local fruit tasting, but the day was quite long.",
          },
        ],
        guideId: 2,
      },
    ],
  },
];

export let bookedTours: BookedTour[] = [
  {
    id: 1,
    destination: "Hanoi Old Quarter Walk",
    image:
      "https://adventurejourney.vn/upload/image/news/old-quarter-hanoi.jpg",
    startDate: "2023-07-01",
    endDate: "2023-07-01",
    status: "Upcoming",
    tourGuide: tourGuides[0],
    duration: 1,
    price: 300000,
  },
  {
    id: 2,
    destination: "Cu Chi Tunnels Tour",
    image: "https://statics.vinpearl.com/cu-chi-tunnels-8_1689392552.jpg",
    startDate: "2023-08-15",
    endDate: "2023-08-15",
    status: "Upcoming",
    tourGuide: tourGuides[1],
    duration: 1,
    price: 450000,
  },
  {
    id: 3,
    destination: "Halong Bay Cruise",
    image:
      "https://www.pelago.co/img/products/VN-Vietnam/standard-cruise-halong-bay-1-day-trip-from-hanoi-by-expressway/3d573897-7ece-449b-84ef-6d4bcf5b0d46_standard-cruise-halong-bay-1-day-trip-from-hanoi-by-expressway-medium.jpg",
    startDate: "2023-06-01",
    endDate: "2023-06-02",
    status: "Completed",
    tourGuide: tourGuides[0],
    duration: 2,
    price: 800000,
    review: {
      text: "Amazing experience! The scenery was breathtaking and the guide was very knowledgeable.",
      rating: 5,
    },
  },
];

export const addBookedTour = (newTour: BookedTour) => {
  bookedTours = [...bookedTours, newTour];
};

export const updateBookedTourReview = (
  tourId: number,
  review: { text: string; rating: number }
) => {
  bookedTours = bookedTours.map((tour) =>
    tour.id === tourId ? { ...tour, review } : tour
  );
};
