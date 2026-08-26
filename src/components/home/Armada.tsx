import Image from "next/image";
import { getVehiclesMarketing } from "@/lib/data";
import Reveal from "./Reveal";

export default async function Armada() {
  const vehicles = await getVehiclesMarketing();

  if (vehicles.length === 0) return null;

  return (
    <section className="py-20 bg-ivory sm:py-28">
      <div className="container px-4 mx-auto sm:px-6">
        <Reveal>
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
              Armada Kami
            </p>
            <h2 className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              Kendaraan Nyaman, Sopir Profesional
            </h2>
            <p className="mt-3 text-lg text-ink-500">
              Semua armada ber-AC, terawat, dan asuransi.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {vehicles.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.06}>
              <div className="group p-5 rounded-2xl bg-sand-50 border border-sand-200 shadow-card hover:shadow-cardHover transition-shadow text-center">
                <div className="relative mb-4 h-24">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {v.name}
                </h3>
                <p className="text-xs text-ink-400 mb-1">{v.capacity}</p>
                {v.priceLabel && (
                  <p className="text-sm font-semibold text-teak-600">
                    {v.priceLabel}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}