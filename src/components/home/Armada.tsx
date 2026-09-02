import { getVehiclesMarketing } from "@/lib/data";
import Showroom from "./Showroom";

export default async function Armada() {
  const vehicles = await getVehiclesMarketing();
  if (vehicles.length === 0) return null;

  return (
    <section className="py-28 bg-sand-50 sm:py-36">
      <div className="px-6 mx-auto max-w-[1400px] lg:px-10">
        <div className="mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">Armada Kami</p>
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
            Showroom
            <span className="block italic text-gold-500">Kendaraan Pilihan</span>
          </h2>
        </div>

        <Showroom vehicles={vehicles} />
      </div>
    </section>
  );
}
