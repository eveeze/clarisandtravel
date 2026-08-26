import { getVehiclesMarketing } from "@/lib/data";
import Showroom from "./Showroom";
import Reveal from "@/components/Reveal";

export default async function Armada() {
  const vehicles = await getVehiclesMarketing();
  if (vehicles.length === 0) return null;

  return (
    <section className="py-24 bg-volcanic-900 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <Reveal>
          <div className="mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
              Armada Kami
            </p>
            <h2 className="font-display text-4xl font-normal tracking-tight text-stone-50 md:text-6xl">
              Showroom
              <span className="block italic text-gold-300">Kendaraan Pilihan</span>
            </h2>
          </div>
        </Reveal>

        <Showroom vehicles={vehicles} />
      </div>
    </section>
  );
}