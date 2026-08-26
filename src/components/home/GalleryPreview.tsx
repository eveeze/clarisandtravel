import Image from "next/image";
import Link from "next/link";
import { getGalleryItems } from "@/lib/data";
import Reveal from "./Reveal";

export default async function GalleryPreview() {
  const items = await getGalleryItems();
  const preview = items.slice(0, 6);

  if (preview.length === 0) return null;

  return (
    <section className="py-20 bg-ivory sm:py-28">
      <div className="container px-4 mx-auto sm:px-6">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
                Galeri
              </p>
              <h2 className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
                Momen Bersama Kami
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-sm font-semibold text-teak-500 hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {preview.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-2xl aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="absolute bottom-3 left-4 right-4 font-medium text-ivory opacity-0 group-hover:opacity-100 transition-opacity">
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