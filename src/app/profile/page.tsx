import type { Metadata } from "next";
import { getSiteContent } from "@/lib/data";
import ProfileScreen from "./profile_screen";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Claris and City Tour Jogja — tour & travel di Yogyakarta. Pemandu lokal profesional, paket custom, armada nyaman.",
  alternates: {
    canonical: "/profile",
  },
};

type FooterContent = {
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
};

export default async function ProfilePage() {
  const footer = (await getSiteContent<FooterContent>("footer")) ?? {};
  return <ProfileScreen footer={footer} />;
}
