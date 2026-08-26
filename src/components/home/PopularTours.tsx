import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "./Reveal";

export default async function PopularTours() {
  const packages = await prisma.tourPackage.findMany({
    where: { isPopular: true },
    include: { vehicles: true },
    orderBy: { basePrice: "asc" },
    take: 3,
  });

  if (packages.length === 0) return null;

  return (
    <section className="py-20 bg-ivory sm:py-28">
      <div className="container px-4 mx-auto sm:px-6">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
              Pilihan Populer
            </p>
            <h2 className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              Paket Tour Terpopuler
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.1}>
              <Link
                href={`/tours-pricing/${pkg.slug}`}
                className="block group"
              >
                <div className="overflow-hidden rounded-2xl bg-sand-50 border border-sand-200 shadow-card hover:shadow-cardHover transition-shadow">
                  <div className="overflow-hidden relative h-56">
                    <Image
                      src={pkg.thumbnail}
                      alt={pkg.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-teak-500 text-ivory">
                      Populer
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 font-display text-xl font-semibold text-ink-900">
                      {pkg.name}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-ink-500 line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-bold text-teak-600">
                        Rp {pkg.basePrice.toLocaleString("id-ID")}
                        <span className="text-sm font-normal text-ink-400">
                          /{pkg.duration}
                        </span>
                      </span>
                      <span className="text-sm font-medium text-teak-500 group-hover:underline">
                        Detail →
                      </span>
                    </div>
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