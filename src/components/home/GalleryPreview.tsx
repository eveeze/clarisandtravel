import Image from "next/image";
import Link from "next/link";
import { getGalleryItems } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default async function GalleryPreview() {
  const items = await getGalleryItems();
  const preview = items.slice(0, 6);
  if (preview.length === 0) return null;

  return (
    <section className="py-24 bg-paper sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Galeri</p>
              <h2 className="font-display text-4xl font-normal tracking-tight text-ink-900 md:text-6xl">
                Momen di Jogja
              </h2>
            </div>
            <Link href="/gallery" className="text-sm font-semibold text-gold-600 hover:underline">
              Lihat Semua →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {preview.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <div className="group relative overflow-hidden rounded-2xl aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-volcanic-900/0 group-hover:bg-volcanic-900/40 transition-all duration-500" />
                <p className="absolute bottom-4 left-5 font-display text-lg text-ink-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {item.title}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
