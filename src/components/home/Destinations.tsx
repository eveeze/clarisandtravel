import Image from "next/image";
import Link from "next/link";
import { getTouristSpots } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default async function Destinations() {
  const spots = await getTouristSpots();
  const preview = spots.slice(0, 6);
  if (preview.length === 0) return null;

  return (
    <section className="py-24 bg-volcanic-900 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
                Destinasi
              </p>
              <h2 className="font-display text-4xl font-normal tracking-tight text-stone-50 md:text-6xl">
                Jelajahi Jogja
              </h2>
            </div>
            <Link href="/tourist-destination" className="text-sm font-semibold text-gold-400 hover:underline">
              Semua Destinasi →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {preview.map((spot, i) => {
            const isLarge = i === 0 || i === 1;
            return (
              <Reveal key={spot.id} delay={i * 60}>
                <div
                  className={`group relative overflow-hidden rounded-2xl ${
                    isLarge ? "md:row-span-2 md:col-span-2" : ""
                  } ${isLarge ? "aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={spot.imageUrl}
                    alt={spot.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-volcanic-950 via-volcanic-950/20 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                      {spot.category}
                    </p>
                    <h3 className="font-display text-2xl text-stone-50">{spot.name}</h3>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}