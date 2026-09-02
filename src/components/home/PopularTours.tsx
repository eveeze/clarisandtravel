import Image from "next/image";
import Link from "next/link";
import { getTourPackages } from "@/lib/data";

export default async function PopularTours() {
  const all = await getTourPackages();
  const packages = all
    .filter((p) => p.isPopular)
    .sort((a, b) => a.basePrice - b.basePrice)
    .slice(0, 3);

  if (packages.length === 0) return null;

  return (
    <section className="py-28 bg-sand-50 sm:py-36">
      <div className="px-6 mx-auto max-w-[1400px] lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">Pilihan</p>
            <h2 className="font-display text-5xl leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
              Paket Tour
              <span className="block italic text-gold-500">Terfavorit</span>
            </h2>
          </div>
          <Link
            href="/tours-pricing"
            className="text-sm font-medium text-ink-500 hover:text-gold-600 transition-colors"
          >
            Semua Paket →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <Link
              key={pkg.id}
              href={`/tours-pricing/${pkg.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-white border border-sand-200 transition-all duration-500 hover:border-gold-400/50 hover:shadow-cardHover"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={pkg.thumbnail}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-volcanic-950/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-ink-900 transition-colors duration-300 group-hover:text-gold-600">
                  {pkg.name}
                </h3>
                <p className="mt-2 mb-5 text-sm leading-relaxed text-ink-500 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-sand-200">
                  <span className="font-display text-2xl text-gold-600">
                    Rp {pkg.basePrice.toLocaleString("id-ID")}
                    <span className="ml-1 text-sm font-body text-ink-400">/{pkg.duration}</span>
                  </span>
                  <span className="text-sm font-medium text-ink-400 transition-colors duration-300 group-hover:text-gold-600">
                    Lihat Detail →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
