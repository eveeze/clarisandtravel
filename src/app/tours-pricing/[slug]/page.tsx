import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTourPackages, getTourPackageBySlug } from "@/lib/data";
import TourDetailClient from "./tour_detail_client";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const packages = await getTourPackages();
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const tour = await getTourPackageBySlug(slug);
  if (!tour) return { title: "Paket Tidak Ditemukan" };

  return {
    title: `${tour.name} — Paket Tour Jogja`,
    description: tour.description,
    alternates: { canonical: `/tours-pricing/${tour.slug}` },
    openGraph: {
      type: "article",
      title: `${tour.name} — Paket Tour Jogja`,
      description: tour.description,
      images: [{ url: tour.thumbnail, alt: tour.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.name} — Paket Tour Jogja`,
      description: tour.description,
      images: [tour.thumbnail],
    },
  };
}

export default async function TourPackageDetailPage(props: {
  params: Params;
}) {
  const { slug } = await props.params;
  const tour = await getTourPackageBySlug(slug);
  if (!tour) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.name,
    description: tour.description,
    image: tour.thumbnail,
    brand: { "@type": "Brand", name: "Claris and City Tour Jogja" },
    offers: {
      "@type": "Offer",
      price: tour.basePrice,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `https://clarisandtravel.vercel.app/tours-pricing/${tour.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient tour={tour} />
    </>
  );
}
