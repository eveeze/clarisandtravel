import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-volcanic-900 sm:py-40">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #E8B34B 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative px-6 mx-auto text-center max-w-3xl">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">Siap Berangkat?</p>
          <h2 className="mb-8 font-display text-5xl font-normal tracking-tight text-white md:text-7xl">
            Mulai Petualanganmu
            <span className="block italic text-gold-400">di Yogyakarta</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-stone-300">
            Konsultasi gratis, itinerary custom, dan pemandu lokal yang siap nemenin perjalananmu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/tours-pricing">Lihat Paket Tour</Button>
            <Button href="/profile" variant="ghost" className="border-white/30 text-white hover:bg-white/10">
              Hubungi Kami
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
