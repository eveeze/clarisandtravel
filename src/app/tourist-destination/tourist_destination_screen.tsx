// tourist_destination_screen.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { TouristSpotScreen } from "@/components/TouristSpotScreen";

const touristSpots = [
  {
    id: "borobudur",
    name: "Borobudur Temple",
    description:
      "The world's largest Buddhist temple, Borobudur is a 9th-century Mahayana Buddhist temple featuring intricate relief panels and Buddha statues.",
    history:
      "Built during the reign of the Sailendra Dynasty, Borobudur was constructed between 750 and 850 AD. The temple was abandoned in the 14th century following the decline of Buddhist and Hindu kingdoms in Java.",
    imageUrl: "/images/borobudur.jpg",
    location: "Magelang, Central Java",
    category: "Temple",
  },
  {
    id: "prambanan",
    name: "Prambanan Temple",
    description:
      "The largest Hindu temple site in Indonesia, known for its tall and pointed architecture, dedicated to the Trimurti: Shiva, Vishnu, and Brahma.",
    history:
      "Built in the 9th century during the reign of the Mataram Kingdom. The temple compound was expanded by successive kings, with the original temple believed to have been built around 850 CE.",
    imageUrl: "/images/prambanans.jpeg",
    location: "Yogyakarta Special Region",
    category: "Temple",
  },
  {
    id: "malioboro",
    name: "Malioboro Street",
    description:
      "The most famous street in Yogyakarta, known for its traditional market atmosphere, street food, and shopping destinations.",
    history:
      "Originally a ceremonial and diplomatic avenue during the Sultanate period, Malioboro has evolved into the heart of Yogyakarta's tourism and commerce.",
    imageUrl: "/images/malioboro.jpg",
    location: "Central Yogyakarta",
    category: "Shopping",
  },
  {
    id: "tamansari",
    name: "Tamansari Water Castle",
    description:
      "A historical site and royal garden built for the Sultan of Yogyakarta, featuring pools, waterways, and beautiful architecture.",
    history:
      "Constructed in the 18th century, Tamansari served as a leisure retreat for the royal family and is a symbol of Yogyakarta's rich history.",
    imageUrl: "/images/tamansari.jpg",
    location: "Kraton, Yogyakarta",
    category: "Historical",
  },
  {
    id: "keraton",
    name: "Keraton Yogyakarta",
    description:
      "The royal palace of the Sultan of Yogyakarta, showcasing traditional Javanese architecture and rich cultural heritage.",
    history:
      "Built in the mid-18th century, the Keraton is still the residence of the Sultan and serves as a cultural center for the region.",
    imageUrl: "/images/keraton.png",
    location: "Yogyakarta",
    category: "Cultural",
  },
  {
    id: "gumuk-pasir",
    name: "Gumuk Pasir (Parangkusumo Sand Dune)",
    description:
      "A unique sand dune area near Parangtritis Beach, popular for sandboarding and stunning sunset views.",
    history:
      "Formed by volcanic ash and wind erosion, Gumuk Pasir is a natural wonder that attracts adventure seekers and photographers.",
    imageUrl: "/images/gumuk-pasir.jpg",
    location: "Parangtritis, Yogyakarta",
    category: "Adventure",
  },
  {
    id: "goa-pindul",
    name: "Goa Pindul",
    description:
      "A popular cave for tubing and exploring, known for its beautiful stalactites and stalagmites.",
    history:
      "Discovered in the 1990s, Goa Pindul has become a favorite destination for adventure tourism in Yogyakarta.",
    imageUrl: "/images/goa-pindul.jpeg",
    location: "Gunung Kidul, Yogyakarta",
    category: "Adventure",
  },
  {
    id: "obelix-sea-view",
    name: "Obelix Sea View",
    description:
      "A scenic spot offering breathtaking views of the ocean, perfect for relaxation and photography.",
    history:
      "Developed as a tourist destination, Obelix Sea View features a restaurant and various photo spots overlooking the sea.",
    imageUrl: "/images/obelix-sea-view.jpeg",
    location: "Yogyakarta",
    category: "Scenic",
  },
  {
    id: "pusat-oleh-oleh",
    name: "Pusat Oleh-Oleh Jogja",
    description:
      "A central hub for souvenirs and local delicacies, offering a wide range of products from Yogyakarta.",
    history:
      "Established to promote local crafts and culinary delights, this market has become a must-visit for tourists seeking authentic Yogyakarta souvenirs.",
    imageUrl: "/images/pusat-oleh-oleh.jpg",
    location: "Yogyakarta",
    category: "Shopping",
  },
  {
    id: "jeep-merapi",
    name: "Jeep Merapi Lava Tour",
    description:
      "An adventurous tour exploring the volcanic landscape around Mount Merapi in a 4x4 jeep.",
    history:
      "This tour offers insights into the 2010 eruption of Mount Merapi and showcases the natural beauty and resilience of the local community.",
    imageUrl: "/images/jeep-merapi.jpg",
    location: "Yogyakarta",
    category: "Adventure",
  },
  {
    id: "bumi-merapi",
    name: "Bumi Merapi",
    description:
      "A beautiful natural area offering stunning views of Mount Merapi, perfect for outdoor activities and relaxation.",
    history:
      "Bumi Merapi has become a popular destination for nature lovers and those seeking tranquility away from the city.",
    imageUrl: "/images/bumi-merapi.jpg",
    location: "Yogyakarta",
    category: "Nature",
  },
  {
    id: "heha-sky-view",
    name: "Heha Sky View",
    description:
      "A popular spot known for its panoramic views of Yogyakarta, ideal for enjoying sunsets and taking photos.",
    history:
      "Heha Sky View has quickly gained popularity among tourists and locals for its picturesque scenery and dining options.",
    imageUrl: "/images/heha-sky-view.jpg",
    location: "Yogyakarta",
    category: "Scenic",
  },
  {
    id: "studio-gamplong",
    name: "Studio Gamplong Alam",
    description:
      "A film studio and tourist attraction that offers a glimpse into the world of filmmaking with various sets and backdrops.",
    history:
      "Established as a filming location, Studio Gamplong has become a unique destination for visitors interested in cinema.",
    imageUrl: "/images/studio-gamplong.jpg",
    location: "Sleman, Yogyakarta",
    category: "Cultural",
  },
  {
    id: "omah-cantrik",
    name: "Omah Cantrik",
    description:
      "A traditional Javanese house offering cultural experiences, workshops, and local cuisine.",
    history:
      "Omah Cantrik aims to preserve Javanese culture and provide visitors with an authentic experience of local traditions.",
    imageUrl: "/images/omah-cantrik.jpeg",
    location: "Yogyakarta",
    category: "Cultural",
  },
  {
    id: "geblek-pari",
    name: "Geblek Pari",
    description:
      "A traditional snack made from cassava, popular in Yogyakarta, often enjoyed as a street food delicacy.",
    history:
      "Geblek Pari has been a part of Yogyakarta's culinary heritage, representing the local flavors and traditions.",
    imageUrl: "/images/geblek-pari.jpg",
    location: "Yogyakarta",
    category: "Culinary",
  },
  {
    id: "punthuk-setumbu",
    name: "Punthuk Setumbu",
    description:
      "A hilltop viewpoint offering breathtaking sunrise views over Borobudur Temple and the surrounding landscape.",
    history:
      "Punthuk Setumbu has become a favorite spot for photographers and nature lovers seeking stunning vistas.",
    imageUrl: "/images/puthuk-setumbu.jpg",
    location: "Magelang, Central Java",
    category: "Scenic",
  },
  {
    id: "service-mangunan",
    name: "Service Mangunan",
    description:
      "A popular viewpoint in Mangunan offering panoramic views of the Oyo River and lush green hills.",
    history:
      "Service Mangunan has become a well-known destination for those looking to enjoy the beauty of nature and tranquility.",
    imageUrl: "/images/service-mangunan.jpg",
    location: "Dlingo, Bantul, Yogyakarta",
    category: "Scenic",
  },
  {
    id: "hutan-pinus",
    name: "Hutan Pinus",
    description:
      "A serene pine forest offering a peaceful retreat and beautiful walking trails, perfect for nature lovers.",
    history:
      "Hutan Pinus has become a popular destination for those seeking tranquility and a connection with nature.",
    imageUrl: "/images/hutan-pinus.jpeg",
    location: "Mangunan, Bantul, Yogyakarta",
    category: "Nature",
  },
  {
    id: "tumpeng-menoreh",
    name: "Tumpeng Menoreh",
    description:
      "A scenic viewpoint offering stunning views of the Menoreh Hills and surrounding landscapes, ideal for photography.",
    history:
      "Tumpeng Menoreh has gained popularity for its breathtaking vistas and is a favorite spot for tourists and locals alike.",
    imageUrl: "/images/tumpeng-menoreh.jpg",
    location: "Kulon Progo, Yogyakarta",
    category: "Scenic",
  },
  {
    id: "sungai-mudal",
    name: "Sungai Mudal",
    description:
      "A beautiful river known for its clear waters and lush surroundings, perfect for relaxation and picnics.",
    history:
      "Sungai Mundal is a hidden gem that attracts visitors looking for a peaceful escape in nature.",
    imageUrl: "/images/sungai-mundal.jpg",
    location: "Yogyakarta",
    category: "Nature",
  },
  {
    id: "puncak-segoro",
    name: "Puncak Segoro",
    description:
      "A popular hilltop destination offering panoramic views of the ocean and surrounding landscapes, ideal for sunset watching.",
    history:
      "Puncak Segoro has become a favorite spot for those seeking breathtaking views and a serene atmosphere.",
    imageUrl: "/images/puncak-segoro.jpg",
    location: "Gunung Kidul, Yogyakarta",
    category: "Scenic",
  },
  {
    id: "heha-ocean",
    name: "Heha Ocean",
    description:
      "A coastal destination known for its stunning ocean views and vibrant atmosphere, perfect for relaxation and dining.",
    history:
      "Heha Ocean has quickly become a popular spot for tourists looking to enjoy the beauty of the coastline.",
    imageUrl: "/images/heha-ocean.jpg",
    location: "Gunung Kidul, Yogyakarta",
    category: "Scenic",
  },
  {
    id: "pantai-gunung-kidul",
    name: "Pantai Gunung Kidul",
    description:
      "A series of beautiful beaches along the southern coast of Yogyakarta, known for their clear waters and stunning cliffs.",
    history:
      "Pantai Gunung Kidul is famous for its natural beauty and has become a popular destination for beach lovers.",
    imageUrl: "/images/pantai-gunung-kidul.jpg",
    location: "Gunung Kidul, Yogyakarta",
    category: "Beach",
  },
];

export default function TouristAttractions() {
  return (
    <section className="w-full bg-primary-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {touristSpots.map((spotData, index) => (
          <TouristSpotScreen key={spotData.id} spot={spotData} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
