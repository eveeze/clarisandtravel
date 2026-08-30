import Link from "next/link";
import { Icon } from "@iconify/react";
import Reveal from "@/components/Reveal";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-volcanic-900 sm:py-40">
      <div className="relative px-6 mx-auto text-center max-w-3xl">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">Siap Berangkat?</p>
          <h2 className="mb-8 font-display text-5xl font-normal tracking-tight text-sand-50 md:text-7xl">
            Mulai Petualanganmu
            <span className="block italic text-gold-400">di Yogyakarta</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-sand-300">
            Konsultasi gratis, itinerary custom, dan pemandu lokal yang siap nemenin perjalananmu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tours-pricing"
              className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full bg-gold-500 text-ink-900 hover:bg-gold-400 transition-colors"
            >
              Lihat Paket Tour
              <Icon
                icon="mdi:arrow-right"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center px-8 py-4 text-sm font-semibold rounded-full border border-sand-300/40 text-sand-100 hover:bg-sand-100/10 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
