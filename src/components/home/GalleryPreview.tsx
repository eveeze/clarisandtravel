import Image from "next/image";
import Link from "next/link";
import { getGalleryItems } from "@/lib/data";

export default async function GalleryPreview() {
  const items = await getGalleryItems();
  const preview = items.slice(0, 6);
  if (preview.length === 0) return null;

  return (
    <section className="py-28 bg-sand-50 sm:py-36">
      <div className="px-6 mx-auto max-w-[1400px] lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">Galeri</p>
            <h2 className="font-display text-5xl leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
              Momen di Jogja
            </h2>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-ink-500 hover:text-gold-600 transition-colors">
            Lihat Semua →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {preview.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-square">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-volcanic-950/0 group-hover:bg-volcanic-950/40 transition-all duration-500" />
              <p className="absolute bottom-4 left-5 font-display text-lg text-sand-50 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
