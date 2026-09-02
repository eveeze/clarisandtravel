import { getSiteContent } from "@/lib/data";

type ReasonContent = {
  title: string;
  subtitle: string;
  items: { title: string; description: string }[];
};

export default async function Reasons() {
  const reason = (await getSiteContent<ReasonContent>("reason")) ?? { title: "", subtitle: "", items: [] };

  if (reason.items.length === 0) return null;

  return (
    <section className="py-28 bg-paper sm:py-36">
      <div className="px-6 mx-auto max-w-[1400px] lg:px-10">
        {/* Editorial intro — besar, tanpa numbered slop */}
        <div className="max-w-3xl mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-500">Keunggulan Kami</p>
          <h2 className="font-display text-5xl leading-[1.05] tracking-tight text-ink-900 md:text-7xl">
            {reason.title}
          </h2>
          {reason.subtitle && <p className="mt-6 text-lg leading-relaxed text-ink-500">{reason.subtitle}</p>}
        </div>

        {/* Daftar — border halus, gak ada angka dekoratif */}
        <div className="divide-y divide-sand-200 border-t border-sand-200">
          {reason.items.map((item) => (
            <div key={item.title} className="group grid grid-cols-1 gap-3 py-8 lg:grid-cols-12 lg:items-baseline">
              <h3 className="font-display text-2xl text-ink-900 transition-colors duration-300 group-hover:text-gold-600 lg:col-span-4 lg:text-3xl">
                {item.title}
              </h3>
              <p className="leading-relaxed text-ink-500 lg:col-span-8">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
