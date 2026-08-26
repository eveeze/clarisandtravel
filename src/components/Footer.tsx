import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getSiteContent } from "@/lib/data";

const quickLinks = [
  { title: "Paket Tour", href: "/tours-pricing" },
  { title: "Destinasi", href: "/tourist-destination" },
  { title: "Galeri", href: "/gallery" },
  { title: "Blog", href: "/blogs" },
  { title: "Tentang Kami", href: "/profile" },
];

type FooterContent = {
  address: string;
  phone: string;
  email: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
};

export default async function Footer() {
  const footer = (await getSiteContent<FooterContent>("footer")) ?? {
    address: "Malioboro Street, Yogyakarta, Indonesia",
    phone: "+62 857 7953 6859",
    email: "info@claristour.com",
  };

  return (
    <footer className="bg-volcanic-950 border-t border-stone-800/50">
      <div className="px-6 py-16 mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 overflow-hidden border rounded-full border-gold-400/30">
                <Image src="/logo.png" alt="Claris & City" fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-xl text-stone-50">Claris & City</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">Tour Jogja</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Tour & travel di Yogyakarta — paket wisata, city tour, dan sewa
              mobil dengan sopir profesional.
            </p>
            <div className="flex gap-3">
              {footer.facebook && (
                <Link href={footer.facebook} target="_blank" aria-label="Facebook" className="p-2 rounded-lg bg-volcanic-800 hover:bg-volcanic-700 transition-colors">
                  <Icon icon="mdi:facebook" width={18} height={18} className="text-stone-300" />
                </Link>
              )}
              {footer.instagram && (
                <Link href={footer.instagram} target="_blank" aria-label="Instagram" className="p-2 rounded-lg bg-volcanic-800 hover:bg-volcanic-700 transition-colors">
                  <Icon icon="mdi:instagram" width={18} height={18} className="text-stone-300" />
                </Link>
              )}
              {footer.youtube && (
                <Link href={footer.youtube} target="_blank" aria-label="YouTube" className="p-2 rounded-lg bg-volcanic-800 hover:bg-volcanic-700 transition-colors">
                  <Icon icon="mdi:youtube" width={18} height={18} className="text-stone-300" />
                </Link>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg text-stone-100">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-start">
                <Icon icon="mdi:map-marker" width={18} height={18} className="mt-0.5 text-gold-400" />
                <span className="text-stone-400">{footer.address}</span>
              </li>
              <li className="flex gap-3 items-center">
                <Icon icon="mdi:phone" width={18} height={18} className="text-gold-400" />
                <a href={`tel:${footer.phone.replace(/\D/g, "")}`} className="text-stone-400 hover:text-stone-100">
                  {footer.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Icon icon="mdi:email" width={18} height={18} className="text-gold-400" />
                <a href={`mailto:${footer.email}`} className="text-stone-400 hover:text-stone-100">
                  {footer.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg text-stone-100">Menu</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 text-stone-400 hover:text-gold-400 transition-colors">
                    <span className="w-3 h-px bg-gold-400/50" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-lg text-stone-100">Kenapa Kami?</h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              {["Pemandu lokal profesional", "Paket fleksibel & custom", "Armada nyaman + sopir", "Layanan 24/7"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-gold-400">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/50">
        <div className="px-6 py-5 mx-auto text-center text-xs text-stone-600 max-w-7xl">
          © {new Date().getFullYear()} Claris & City Tour Jogja. All rights reserved.
        </div>
      </div>
    </footer>
  );
}