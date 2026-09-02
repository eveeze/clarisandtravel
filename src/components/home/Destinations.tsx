import Image from "next/image";
import Link from "next/link";
import { getTouristSpots } from "@/lib/data";

export default async function Destinations() {
  const spots = await getTouristSpots();
  const preview = spots.slice(0, 6);
  if (preview.length === 0) return null;

  return (
    <section className="py-28 bg-paper sm:py-36">
      <div className="px-6 mx-auto max-w-[1400px] lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">Destinasi</p>
            <h2 className="font-display text-5xl leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
              Jelajahi Jogja
            </h2>
          </div>
          <Link
            href="/tourist-destination"
            className="text-sm font-medium text-ink-500 hover:text-gold-600 transition-colors"
          >
            Semua Destinasi →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {preview.map((spot, i) => {
            const isLarge = i === 0 || i === 1;
            return (
              <div
                key={spot.id}
                className={`group relative overflow-hidden rounded-2xl ${
                  isLarge ? "md:row-span-2 md:col-span-2" : ""
                } aspect-[4/3] md:aspect-auto`}
              >
                <Image
                  src={spot.imageUrl}
                  alt={spot.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-volcanic-950/80 via-volcanic-950/10 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                    {spot.category}
                  </p>
                  <h3 className="font-display text-2xl text-sand-50">{spot.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
