import { Icon } from "@iconify/react";
import { getSiteContent } from "@/lib/data";
import Reveal from "./Reveal";

type ReasonContent = {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
};

const icons = ["mdi:map-marker-radius", "mdi:heart", "mdi:shield-check", "mdi:star"];

export default async function Reasons() {
  const reason = (await getSiteContent<ReasonContent>("reason")) ?? {
    title: "Kenapa Claris & Travel?",
    subtitle: "Kami buat pengalaman Jogja Anda tak terlupakan",
    items: [],
  };

  if (reason.items.length === 0) return null;

  return (
    <section className="py-20 bg-sand-50 sm:py-28">
      <div className="container px-4 mx-auto sm:px-6">
        <Reveal>
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-teak-500">
              Keunggulan Kami
            </p>
            <h2 className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              {reason.title}
            </h2>
            {reason.subtitle && (
              <p className="mt-3 text-lg text-ink-500">{reason.subtitle}</p>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reason.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full p-6 rounded-2xl bg-ivory border border-sand-200 shadow-card">
                <div className="mb-4 flex justify-center items-center w-12 h-12 rounded-xl bg-forest-50">
                  <Icon
                    icon={icons[i % icons.length]}
                    className="w-6 h-6 text-teak-600"
                  />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
