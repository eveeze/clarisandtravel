import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="py-24 bg-teak-500">
      <div className="container px-4 mx-auto text-center sm:px-6">
        <Reveal>
          <h2 className="mb-4 font-display text-3xl font-bold text-ivory md:text-5xl">
            Siap Menjelajah Jogja?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-ivory/90">
            Pesan paket tour Anda sekarang — gratis konsultasi & itinerary custom
            sesuai keinginan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tours-pricing"
              className="px-8 py-4 font-semibold rounded-xl bg-forest-950 text-ivory hover:bg-forest-800 transition-colors"
            >
              Lihat Paket Tour
            </Link>
            <Link
              href="/profile"
              className="px-8 py-4 font-semibold rounded-xl border border-ivory/50 text-ivory hover:bg-ivory/10 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
