import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getTouristSpots } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const spots = await getTouristSpots();
  return spots.map((s) => ({ slug: s.id }));
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params;
  const spots = await getTouristSpots();
  const spot = spots.find((s) => s.id === slug);
  if (!spot) return { title: "Destinasi Tidak Ditemukan" };

  return {
    title: `${spot.name} — Destinasi Wisata Jogja`,
    description: `${spot.description} ${spot.history ? `Sejarah: ${spot.history.slice(0, 120)}...` : ""} Kunjungi ${spot.name} di ${spot.location} bersama Claris & City Tour.`,
    alternates: { canonical: `/tourist-destination/${spot.id}` },
    openGraph: {
      type: "article",
      title: `${spot.name} — Wisata Jogja`,
      description: spot.description,
      images: [{ url: spot.imageUrl, alt: spot.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${spot.name} — Wisata Jogja`,
      description: spot.description,
      images: [spot.imageUrl],
    },
  };
}

export default async function TouristSpotDetailPage(props: { params: Params }) {
  const { slug } = await props.params;
  const spots = await getTouristSpots();
  const spot = spots.find((s) => s.id === slug);
  if (!spot) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: spot.name,
    description: spot.description,
    image: spot.imageUrl,
    location: { "@type": "Place", address: spot.location },
  };

  const relatedPackages = await prisma.tourPackage.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    select: { slug: true, name: true, thumbnail: true, basePrice: true, duration: true },
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="bg-paper pt-28 pb-24">
        <div className="px-6 mx-auto max-w-4xl lg:px-8">
          <Link
            href="/tourist-destination"
            className="inline-flex items-center gap-2 mb-6 text-sm text-gold-600 hover:text-gold-500 transition-colors"
          >
            <span>&larr;</span> Semua Destinasi
          </Link>

          <div className="relative h-80 mb-8 overflow-hidden rounded-2xl">
            <Image src={spot.imageUrl} alt={spot.name} fill className="object-cover" />
          </div>

          <div className="mb-2">
            {spot.category && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gold-500 text-volcanic-900">
                {spot.category}
              </span>
            )}
          </div>

          <h1 className="mb-4 font-display text-4xl font-normal tracking-tight text-ink-900 md:text-5xl">
            {spot.name}
          </h1>

          <p className="text-lg text-ink-500 mb-6">{spot.location}</p>
          <p className="text-ink-700 leading-relaxed mb-8">{spot.description}</p>

          {spot.history && (
            <div className="mb-10 p-6 rounded-2xl bg-white border border-sand-200">
              <h2 className="mb-3 font-display text-2xl text-ink-900">Sejarah</h2>
              <p className="text-ink-500 leading-relaxed">{spot.history}</p>
            </div>
          )}

          <div className="mb-10 p-6 rounded-2xl bg-gold-500/10 border border-gold-400/30">
            <h2 className="mb-3 font-display text-2xl text-ink-900">Tertarik Berkunjung?</h2>
            <p className="text-ink-500 mb-4">
              Pesan paket tour Jogja dan kunjungi {spot.name} dengan pemandu lokal profesional.
            </p>
            <Link
              href="/tours-pricing"
              className="inline-block px-6 py-3 rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
            >
              Lihat Paket Tour
            </Link>
          </div>

          {relatedPackages.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-2xl text-ink-900">Paket Tour Terkait</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedPackages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/tours-pricing/${p.slug}`}
                    className="p-4 rounded-2xl bg-white border border-sand-200 hover:border-gold-400/30 transition-colors"
                  >
                    <div className="relative h-32 mb-3 overflow-hidden rounded-xl">
                      <Image src={p.thumbnail} alt={p.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-semibold text-ink-900">{p.name}</h3>
                    <p className="text-xs text-ink-500">{p.duration}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
