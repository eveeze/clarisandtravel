import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/data";
import GalleryScreen from "./gallery_screen";

export const metadata: Metadata = {
  title: "Galeri Foto Wisata Jogja",
  description:
    "Galeri foto destinasi dan momen bersama Claris and City Tour: Borobudur, Malioboro, Merapi, dan keindahan Yogyakarta.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function GalleryPage() {
  const items = await getGalleryItems();
  return <GalleryScreen items={items} />;
}
