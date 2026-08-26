import Image from "next/image";
import Link from "next/link";
import { getTouristSpots } from "@/lib/data";
import Reveal from "./Reveal";

export default async function Destinations() {
  const spots = await getTouristSpots();
  const preview = spots.slice(0, 6);

  if (preview.length === 0) return null;

  return (
    <section className="py-20 bg-forest-950 sm:py-28">
      <div className="container px-4 mx-auto sm:px-6">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-400">
                Destinasi
              </p>
              <h2 className="font-display text-3xl font-bold text-ivory md:text-4xl">
                Jelajahi Jogja
              </h2>
            </div>
            <Link
              href="/tourist-destination"
              className="text-sm font-semibold text-teak-400 hover:underline"
            >
              Semua Destinasi →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((spot, i) => (
            <Reveal key={spot.id} delay={i * 0.06}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <Image
                  src={spot.imageUrl}
                  alt={spot.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-teak-400">
                    {spot.category}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    {spot.name}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}