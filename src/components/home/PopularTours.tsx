import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";

export default async function PopularTours() {
  const packages = await prisma.tourPackage.findMany({
    where: { isPopular: true },
    include: { vehicles: true },
    orderBy: { basePrice: "asc" },
    take: 3,
  });

  if (packages.length === 0) return null;

  return (
    <section className="py-24 bg-volcanic-900 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
                Pilihan Populer
              </p>
              <h2 className="font-display text-4xl font-normal tracking-tight text-stone-50 md:text-6xl">
                Paket Tour
                <span className="block italic text-gold-300">Terfavorit</span>
              </h2>
            </div>
            <Link
              href="/tours-pricing"
              className="text-sm font-semibold text-gold-400 hover:underline"
            >
              Semua Paket →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 120}>
              <Link
                href={`/tours-pricing/${pkg.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-volcanic-800 border border-stone-800/60"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={pkg.thumbnail}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-volcanic-900 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-gold-500 text-volcanic-900">
                    Populer
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-display text-2xl text-stone-50 transition-colors group-hover:text-gold-300">
                    {pkg.name}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-stone-400 line-clamp-2">
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-gold-400">
                      Rp {pkg.basePrice.toLocaleString("id-ID")}
                      <span className="ml-1 text-sm font-body text-stone-500">/{pkg.duration}</span>
                    </span>
                    <span className="text-sm font-medium text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}