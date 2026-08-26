import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/Button";
import { getTourPackages } from "@/lib/data";

type FooterContent = {
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
};

const values = [
  { icon: "mdi:shield-check", title: "Terpercaya", desc: "Berlisensi, kendaraan berasuransi, sopir profesional." },
  { icon: "mdi:map-marker-radius", title: "Ahli Lokal", desc: "Pemandu asli Jogja yang tahu jalan pintas & spot terbaik." },
  { icon: "mdi:heart", title: "Personal", desc: "Itinerary custom sesuai keinginan dan kebutuhan Anda." },
  { icon: "mdi:star", title: "Harga Jujur", desc: "Tanpa biaya tersembunyi, harga transparan sejak awal." },
];

export default async function ProfileScreen({ footer }: { footer: FooterContent }) {
  const packages = await getTourPackages();

  return (
    <main className="bg-volcanic-900 pt-32 pb-24">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">Tentang Kami</p>
          <h1 className="font-display text-4xl font-normal tracking-tight text-stone-50 md:text-6xl">
            Claris & City Tour Jogja
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-400">
            Kami adalah tim tour & travel lokal di Yogyakarta yang percaya bahwa
            perjalanan terbaik adalah yang terasa personal. Dari city tour,
            candi megah, sampai hidden gems — semua kami rancang agar Anda pulang
            dengan cerita.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-20 md:grid-cols-4">
          {[
            { value: `${packages.length}+`, label: "Paket Tour" },
            { value: "5+", label: "Armada" },
            { value: "23+", label: "Destinasi" },
            { value: "1000+", label: "Wisatawan" },
          ].map((stat) => (
            <div key={stat.label} className="p-8 text-center rounded-2xl bg-volcanic-800 border border-stone-800/60">
              <p className="font-display text-5xl text-gold-400">{stat.value}</p>
              <p className="mt-2 text-sm text-stone-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="mb-12 text-center font-display text-4xl text-stone-50">Nilai Kami</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="group p-8 rounded-2xl bg-volcanic-800 border border-stone-800/60 hover:border-gold-400/30 transition-colors">
                <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-volcanic-900">
                  <Icon icon={v.icon} className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="mb-2 font-display text-xl text-stone-50 group-hover:text-gold-300 transition-colors">{v.title}</h3>
                <p className="text-sm leading-relaxed text-stone-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-volcanic-800 border border-stone-800/60">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[300px]">
              <Image src="/images/borobudur.jpg" alt="Borobudur, Yogyakarta" fill className="object-cover" />
            </div>
            <div className="p-10 md:p-14">
              <h2 className="mb-6 font-display text-3xl text-stone-50">Hubungi Kami</h2>
              <ul className="space-y-4 text-stone-400">
                {footer.address && (
                  <li className="flex gap-3 items-start">
                    <Icon icon="mdi:map-marker" className="mt-0.5 text-gold-400" />
                    {footer.address}
                  </li>
                )}
                {footer.phone && (
                  <li className="flex gap-3 items-center">
                    <Icon icon="mdi:phone" className="text-gold-400" />
                    <a href={`tel:${footer.phone.replace(/\D/g, "")}`} className="hover:text-stone-100">{footer.phone}</a>
                  </li>
                )}
                {footer.email && (
                  <li className="flex gap-3 items-center">
                    <Icon icon="mdi:email" className="text-gold-400" />
                    <a href={`mailto:${footer.email}`} className="hover:text-stone-100">{footer.email}</a>
                  </li>
                )}
              </ul>
              <Button href="/tours-pricing" className="mt-8">Lihat Paket Tour</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}