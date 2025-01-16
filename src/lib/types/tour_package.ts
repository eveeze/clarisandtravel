export type VehicleType = {
  id: number;
  name: string;
  capacity: string;
  priceIncrement: number;
  image: string;
};

export type DailyItinerary = {
  day: number;
  title: string;
  destinations: {
    name: string;
    description: string;
    time: string;
  }[];
};

export type TourPackage = {
  id: number;
  slug: string;
  name: string;
  basePrice: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  description: string;
  thumbnail: string;
  images: string[];
  itinerary: DailyItinerary[];
  vehicles: VehicleType[];
  touristType: "local" | "international";
};

// Sample data
export const vehicles: VehicleType[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    capacity: "1-6 persons",
    priceIncrement: 0,
    image: "/avanza.png",
  },
  {
    id: 2,
    name: "Daihatsu Xenia",
    capacity: "1-6 persons",
    priceIncrement: 50000,
    image: "/xenia_bg.png",
  },
  {
    id: 3,
    name: "Toyota Calya",
    capacity: "7 persons",
    priceIncrement: 200000,
    image: "/calya.png",
  },
  {
    id: 4,
    name: "Daihatsu Sigra",
    capacity: "7 persons",
    priceIncrement: 200000,
    image: "/sigra.png",
  },
  {
    id: 5,
    name: "Toyota Inova",
    capacity: "1-12 persons",
    priceIncrement: 200000,
    image: "/inova.png",
  },
  {
    id: 6,
    name: "Toyota Hiace",
    capacity: "1-12 persons",
    priceIncrement: 200000,
    image: "/hiace.png",
  },
];

export const tourPackages: TourPackage[] = [
  {
    id: 1,
    slug: "jogja-city-explore",
    name: "Jogja City Explore",
    basePrice: 250000,
    duration: "1 Day",
    features: [
      "Visit 3 Historical Sites",
      "Local Transportation",
      "Lunch Included",
      "English Speaking Guide",
    ],
    isPopular: true,
    description:
      "Experience the rich cultural heritage of Yogyakarta in this comprehensive city tour...",
    thumbnail: "/images/tugu.jpg",
    images: [
      "/images/borobudur.jpg",
      "/images/bumi-merapi.jpg",
      "/images/goa-pindul.jpeg",
    ],
    itinerary: [
      {
        day: 1,
        title: "Historical Yogyakarta Tour",
        destinations: [
          {
            name: "Kraton Yogyakarta",
            description:
              "Visit the Sultan's Palace and learn about Javanese culture",
            time: "09:00 - 11:00",
          },
          {
            name: "Taman Sari Water Castle",
            description:
              "Explore the historic royal garden and bathing complex",
            time: "11:30 - 13:00",
          },
          {
            name: "Malioboro Street",
            description: "Shopping and local culinary experience",
            time: "14:00 - 16:00",
          },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 2,
    slug: "comprehensive-jogja-tour",
    name: "Comprehensive Jogja Tour",
    basePrice: 750000,
    duration: "2 Days",
    features: [
      "Airport Pickup",
      "5 UNESCO Sites",
      "Luxury Transportation",
      "Professional Guide",
      "Meals & Accommodation",
    ],
    isPopular: true,
    description:
      "An immersive two-day journey through Yogyakarta's most iconic locations...",
    thumbnail: "/images/tours/comprehensive-jogja.jpg",
    images: [
      "/images/tours/comprehensive-1.jpg",
      "/images/tours/comprehensive-2.jpg",
      "/images/tours/comprehensive-3.jpg",
    ],
    itinerary: [
      {
        day: 1,
        title: "City and Temple Tour",
        destinations: [
          {
            name: "Borobudur Temple",
            description: "Sunrise tour at the world's largest Buddhist temple",
            time: "04:30 - 08:00",
          },
          {
            name: "Prambanan Temple",
            description: "Explore the magnificent Hindu temple complex",
            time: "09:00 - 12:00",
          },
          {
            name: "Malioboro Street",
            description: "Traditional market and shopping district",
            time: "14:00 - 17:00",
          },
        ],
      },
      {
        day: 2,
        title: "Nature and Culture",
        destinations: [
          {
            name: "Merapi Volcano",
            description: "Jeep tour around the volcanic landscape",
            time: "08:00 - 11:00",
          },
          {
            name: "Pindul Cave",
            description: "Cave tubing adventure",
            time: "13:00 - 15:00",
          },
          {
            name: "Ramayana Ballet",
            description: "Traditional dance performance",
            time: "19:00 - 21:00",
          },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "international",
  },
];
