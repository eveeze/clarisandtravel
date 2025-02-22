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

// Sample vehicles
export const vehicles: VehicleType[] = [
  {
    id: 1,
    name: "Daihatsu Sigra",
    capacity: "7 persons",
    priceIncrement: 0,
    image: "/sigra.png",
  },
  {
    id: 2,
    name: "Daihatsu Xenia",
    capacity: "1-6 persons",
    priceIncrement: 100000,
    image: "/xenia_bg.png",
  },
  {
    id: 3,
    name: "Toyota Calya",
    capacity: "7 persons",
    priceIncrement: 0,
    image: "/calya.png",
  },
  {
    id: 4,
    name: "Toyota Avanza",
    capacity: "1-6 persons",
    priceIncrement: 100000,
    image: "/avanza.png",
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
  {
    id: 7,
    name: "All New Avanza",
    capacity: "1-6 persons",
    priceIncrement: 150000,
    image: "/avanza.png",
  },
  {
    id: 8,
    name: "All New Xenia",
    capacity: "1-6 persons",
    priceIncrement: 150000,
    image: "/xenia_bg.png",
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

  // Paket Tour dari file "tour lokal.txt" (Paket Jogja A-F Lokal)
  {
    id: 3,
    slug: "paket-A",
    name: "Paket Jogja A Lokal",
    basePrice: 550000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-lokal-a.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "candi borobudur", description: "", time: "" },
          { name: "lava tour", description: "", time: "" },
          { name: "candi prambanan", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 4,
    slug: "paket-B",
    name: "Paket Jogja B Lokal",
    basePrice: 550000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-lokal-b.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "tamansari", description: "", time: "" },
          { name: "keraton jogja", description: "", time: "" },
          { name: "museum kereta", description: "", time: "" },
          { name: "museum batik Jogja", description: "", time: "" },
          { name: "oleh oleh khas jogja", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 5,
    slug: "paket-C",
    name: "Paket Jogja C Lokal",
    basePrice: 550000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-lokal-c.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "museum batik jogja", description: "", time: "" },
          { name: "museum coklat monggo", description: "", time: "" },
          { name: "benteng vendenberg", description: "", time: "" },
          { name: "Malioboro", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 6,
    slug: "paket-D",
    name: "Paket Jogja D Lokal",
    basePrice: 550000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-lokal-d.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "diorama arsip jogja", description: "", time: "" },
          { name: "situs Warungboto", description: "", time: "" },
          { name: "museum batik Jogja", description: "", time: "" },
          { name: "benteng vendenberg", description: "", time: "" },
          { name: "Malioboro", description: "", time: "" },
          { name: "pusat oleh oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 7,
    slug: "paket-E",
    name: "Paket Jogja E Lokal",
    basePrice: 550000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-lokal-e.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "museum coklat monggo", description: "", time: "" },
          { name: "museum batik jogja", description: "", time: "" },
          { name: "museum Sono Budoyo", description: "", time: "" },
          { name: "lava tour merapi", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 8,
    slug: "paket-F",
    name: "Paket Jogja F Lokal",
    basePrice: 550000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-lokal-f.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "lava tour merapi", description: "", time: "" },
          { name: "museum coklat monggo", description: "", time: "" },
          { name: "benteng vendenberg", description: "", time: "" },
          { name: "Malioboro", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },

  // Paket Tour dari file "Nama Paket Tour  Paket Jogja Medium.txt"
  {
    id: 9,
    slug: "medium-A",
    name: "Paket Jogja Medium Rute A Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-a.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "candi prambanan", description: "", time: "" },
          { name: "pinus mangunan", description: "", time: "" },
          { name: "jeep gumuk pasir", description: "", time: "" },
          { name: "obelix sea view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 10,
    slug: "medium-B",
    name: "Paket Jogja Medium Rute B Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-b.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "keraton jogja", description: "", time: "" },
          { name: "Tamansari", description: "", time: "" },
          { name: "studio gamplong", description: "", time: "" },
          { name: "omah cantrik", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 11,
    slug: "medium-C",
    name: "Paket Jogja Medium Rute C Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-c.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "candi prambanan", description: "", time: "" },
          { name: "tebing breksi", description: "", time: "" },
          { name: "heha sky view", description: "", time: "" },
          { name: "pinus mangunan", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 12,
    slug: "medium-D",
    name: "Paket Jogja Medium Rute D Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-d.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "omah cantrik", description: "", time: "" },
          { name: "studio gamplong", description: "", time: "" },
          { name: "jeep gumuk pasir", description: "", time: "" },
          { name: "obelix sea view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 13,
    slug: "medium-E",
    name: "Paket Jogja Medium Rute E Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-e.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "lava tour merapi", description: "", time: "" },
          { name: "bhumi merapi", description: "", time: "" },
          { name: "Prambanan", description: "", time: "" },
          { name: "heha sky view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 14,
    slug: "medium-F",
    name: "Paket Jogja Medium Rute F Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-f.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "lava tour merapi", description: "", time: "" },
          { name: "Candi Prambanan", description: "", time: "" },
          { name: "tebing breksi", description: "", time: "" },
          { name: "heha sky view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 15,
    slug: "medium-G",
    name: "Paket Jogja Medium Rute G Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-g.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "candi Borobudur", description: "", time: "" },
          { name: "gereja ayam", description: "", time: "" },
          { name: "Svargabumi", description: "", time: "" },
          { name: "VW Safari", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 16,
    slug: "medium-H",
    name: "Paket Jogja Medium Rute H Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-h.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "keraton jogja", description: "", time: "" },
          { name: "tamansari", description: "", time: "" },
          { name: "Prambanan", description: "", time: "" },
          { name: "lava tour merapi", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 17,
    slug: "medium-I",
    name: "Paket Jogja Medium Rute I Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-i.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "keraton jogja", description: "", time: "" },
          { name: "Tamansari", description: "", time: "" },
          { name: "obelix village", description: "", time: "" },
          { name: "lava tour merapi", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 18,
    slug: "medium-J",
    name: "Paket Jogja Medium Rute J Lokal",
    basePrice: 650000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-medium-j.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "sunrise setumbu", description: "", time: "" },
          { name: "gereja ayam", description: "", time: "" },
          { name: "candi borobudur", description: "", time: "" },
          { name: "VW Safari", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },

  // Paket Tour dari file "Nama Paket Tour  Paket Jogja Long.txt"
  {
    id: 19,
    slug: "long-A",
    name: "Paket Jogja Long Rute A Lokal",
    basePrice: 750000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-long-a.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "goa pindul", description: "", time: "" },
          { name: "pantai timang", description: "", time: "" },
          { name: "jungwok blue ocean", description: "", time: "" },
          { name: "heha ocean view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 20,
    slug: "long-B",
    name: "Paket Jogja Long Rute B Lokal",
    basePrice: 750000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-long-b.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "pantai ngrenehan", description: "", time: "" },
          { name: "pantai mesra", description: "", time: "" },
          { name: "pantai timang", description: "", time: "" },
          { name: "heha sky view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 21,
    slug: "long-C",
    name: "Paket Jogja Long Rute C Lokal",
    basePrice: 750000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-long-c.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "bukit pengilon", description: "", time: "" },
          { name: "pantai watulumbung", description: "", time: "" },
          { name: "pantai timang", description: "", time: "" },
          { name: "Malioboro", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 22,
    slug: "long-D",
    name: "Paket Jogja Long Rute D Lokal",
    basePrice: 750000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-long-d.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "goa pindul", description: "", time: "" },
          { name: "pantai timang", description: "", time: "" },
          { name: "puncak segoro", description: "", time: "" },
          { name: "obelix sea view", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 23,
    slug: "long-E",
    name: "Paket Jogja Long Rute E Lokal",
    basePrice: 850000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-long-e.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "umbul Cokro", description: "", time: "" },
          { name: "umbul ponggok", description: "", time: "" },
          { name: "candi prambanan", description: "", time: "" },
          { name: "tebing breksi", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
  {
    id: 24,
    slug: "long-F",
    name: "Paket Jogja Long Rute F Lokal",
    basePrice: 850000,
    duration: "12 jam",
    features: ["transportasi pribadi", "panduan profesional"],
    description:
      "nikmati petualangan tak terlupakan di jogja dengan mengunjungi tempat tempat wisata blablabla",
    thumbnail: "/images/tour-long-f.jpg",
    images: [],
    itinerary: [
      {
        day: 1,
        title: "Itinerary Day 1",
        destinations: [
          { name: "pura Mangkunegaran", description: "", time: "" },
          { name: "solo safari", description: "", time: "" },
          { name: "the heritage palace", description: "", time: "" },
          { name: "Malioboro", description: "", time: "" },
          { name: "pusat oleh-oleh", description: "", time: "" },
        ],
      },
    ],
    vehicles: vehicles,
    touristType: "local",
  },
];
