import type { Metadata } from "next";
import HomeScreen from "./home_screen";

export const metadata: Metadata = {
  title: "Paket Tour Jogja & Sewa Mobil Dengan Sopir",
  description:
    "Claris and City Tour — paket wisata Jogja lengkap: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir, armada Sigra, Avanza, Innova, Hiace. Booking mudah via WhatsApp.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Claris and City Tour Jogja",
            description:
              "Layanan tour & travel di Yogyakarta: paket city tour, Borobudur, Prambanan, hidden gems, dan sewa mobil dengan sopir.",
            telephone: "+62 857-7953-6859",
            areaServed: "Yogyakarta",
            priceRange: "Rp250.000 - Rp2.000.000",
          }),
        }}
      />
      <HomeScreen />
    </>
  );
}
