import Button from "@/components/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-volcanic-900">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,#c8962c,transparent_50%)]" />
      <div className="relative px-6 py-32 mx-auto text-center max-w-3xl sm:py-40">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">Siap Berangkat?</p>
        <h2 className="mb-8 font-display text-5xl font-normal leading-[1.05] tracking-tight text-sand-50 md:text-7xl">
          Mulai Petualanganmu
          <span className="block italic text-gold-400">di Yogyakarta</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-lg text-sand-200">
          Konsultasi gratis, itinerary custom, dan pemandu lokal yang siap nemenin perjalananmu.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/tours-pricing" variant="onDark">
            Lihat Paket Tour
          </Button>
          <Button href="/profile" variant="onDarkGhost" arrow={false}>
            Hubungi Kami
          </Button>
        </div>
      </div>
    </section>
  );
}
