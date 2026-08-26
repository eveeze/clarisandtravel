import Hero from "@/components/home/Hero";
import PopularTours from "@/components/home/PopularTours";
import Reasons from "@/components/home/Reasons";
import Armada from "@/components/home/Armada";
import Destinations from "@/components/home/Destinations";
import GalleryPreview from "@/components/home/GalleryPreview";
import CTA from "@/components/home/CTA";

export default function HomeScreen() {
  return (
    <main>
      <Hero />
      <PopularTours />
      <Reasons />
      <Armada />
      <Destinations />
      <GalleryPreview />
      <CTA />
    </main>
  );
}
