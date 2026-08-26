import { Icon } from "@iconify/react";
import { getSiteContent } from "@/lib/data";
import Reveal from "./Reveal";

type PickupContent = {
  title: string;
  subtitle: string;
  features: { title: string; description: string }[];
};

const icons = ["solar:clock-circle-bold", "solar:shield-check-bold", "solar:globus-bold"];

export default async function Pickup() {
  const pickup = (await getSiteContent<PickupContent>("pickup")) ?? {
    title: "Layanan Kami",
    subtitle: "Kenyamanan Anda adalah prioritas kami",
    features: [],
  };

  if (pickup.features.length === 0) return null;

  return (
    <section className="py-20 bg-sand-50 sm:py-24">
      <div className="container px-4 mx-auto sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pickup.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="flex gap-4 p-6 rounded-2xl bg-ivory border border-sand-200 shadow-card">
                <div className="flex-shrink-0 flex justify-center items-center w-12 h-12 rounded-xl bg-teak-50">
                  <Icon icon={icons[i % icons.length]} className="w-6 h-6 text-teak-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-lg font-semibold text-ink-900">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-500">{f.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}