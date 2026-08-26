import type { Metadata } from "next";
import { getTourPackages } from "@/lib/data";
import ToursPricingScreen from "./tours_pricing_screen";

export const metadata: Metadata = {
  title: "Paket Tour & Harga — Tours Pricing",
  description:
    "Lihat semua paket tour Jogja dari Claris and City Tour: city tour, Borobudur, Prambanan, hidden gems. Harga transparan, bisa pilih armada.",
  alternates: {
    canonical: "/tours-pricing",
  },
};

export default async function ToursPageScreen() {
  const packages = await getTourPackages();
  return <ToursPricingScreen packages={packages} />;
}
