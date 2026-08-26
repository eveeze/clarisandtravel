import type { Metadata } from "next";
import { getTouristSpots } from "@/lib/data";
import TouristDestinationScreen from "./tourist_destination_screen";

export const metadata: Metadata = {
  title: "Destinasi Wisata Jogja",
  description:
    "Jelajahi destinasi wisata terbaik Yogyakarta: Borobudur, Prambanan, Malioboro, hidden gems, pantai, dan lainnya. Temani liburan Anda bersama Claris and City Tour.",
  alternates: {
    canonical: "/tourist-destination",
  },
};

export default async function TouristDestinationPage() {
  const spots = await getTouristSpots();
  return <TouristDestinationScreen spots={spots} />;
}
