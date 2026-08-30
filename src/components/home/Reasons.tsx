import { getSiteContent } from "@/lib/data";
import Reveal from "@/components/Reveal";

type ReasonContent = {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
};

export default async function Reasons() {
  const reason = (await getSiteContent<ReasonContent>("reason")) ?? { title: "", subtitle: "", items: [] };

  if (reason.items.length === 0) return null;

  return (
    <section className="py-24 bg-sand-100 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Keunggulan</p>
            <h2 className="font-display text-4xl font-normal tracking-tight text-ink-900 md:text-6xl">
              {reason.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            {reason.subtitle && (
              <p className="lg:max-w-sm lg:ml-auto text-lg text-ink-500 lg:text-right">{reason.subtitle}</p>
            )}
          </Reveal>
        </div>

        <div className="divide-y divide-stone-800/60 border-y border-sand-200">
          {reason.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="group grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:items-center lg:py-10">
                <div className="lg:col-span-1">
                  <span className="font-display text-4xl text-ink-500 transition-colors duration-300 group-hover:text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink-900 transition-transform duration-300 group-hover:translate-x-2 lg:col-span-4 lg:text-3xl">
                  {item.title}
                </h3>
                <p className="text-ink-500 leading-relaxed lg:col-span-7">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
