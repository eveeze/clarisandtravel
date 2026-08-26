import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/data";
import Reveal from "./Reveal";

type HeroContent = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
};

export default async function Hero() {
  const hero = (await getSiteContent<HeroContent>("hero")) ?? {
    title: "Jelajahi Keajaiban Yogyakarta",
    subtitle:
      "Tur budaya autentik, candi megah, dan hidden gems — ditemani pemandu pribadi.",
    ctaText: "Lihat Paket Tour",
    ctaLink: "/tours-pricing",
    image: "/hero.png",
  };

  return (
    <section className="relative flex items-center min-h-[92vh] overflow-hidden bg-forest-950">
      <Image
        src={hero.image}
        alt="Yogyakarta landscape"
        fill
        priority
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/70 to-transparent" />

      <div className="container relative z-10 px-4 py-28 mx-auto sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-teak-400">
              Tour & Travel Yogyakarta
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-[1.05] text-ivory md:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-sand-200">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={hero.ctaLink}
                className="px-7 py-3.5 font-semibold rounded-xl bg-teak-500 text-ivory hover:bg-teak-600 transition-colors"
              >
                {hero.ctaText}
              </Link>
              <Link
                href="/tourist-destination"
                className="px-7 py-3.5 font-semibold rounded-xl border border-sand-200/40 text-ivory hover:bg-ivory/10 transition-colors"
              >
                Lihat Destinasi
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
