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
    <footer className="bg-forest-950 text-sand-200">
      <div className="container grid grid-cols-1 gap-10 px-4 py-16 mx-auto sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="overflow-hidden relative w-11 h-11 rounded-full border border-sand-200/20">
              <Image
                src="/logo.png"
                alt="Claris and City Tour Jogja"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-ivory">
                Claris & City
              </p>
              <p className="text-[11px] uppercase tracking-widest text-teak-400">
                Tour Jogja
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-sand-300">
            Tour & travel di Yogyakarta — paket wisata, city tour, dan sewa mobil
            dengan sopir profesional.
          </p>
          <div className="flex gap-3">
            {footer.facebook && (
              <Link href={footer.facebook} target="_blank" aria-label="Facebook" className="p-2 rounded-lg bg-forest-800 hover:bg-forest-700 transition-colors">
                <Icon icon="mdi:facebook" width={18} height={18} />
              </Link>
            )}
            {footer.instagram && (
              <Link href={footer.instagram} target="_blank" aria-label="Instagram" className="p-2 rounded-lg bg-forest-800 hover:bg-forest-700 transition-colors">
                <Icon icon="mdi:instagram" width={18} height={18} />
              </Link>
            )}
            {footer.youtube && (
              <Link href={footer.youtube} target="_blank" aria-label="YouTube" className="p-2 rounded-lg bg-forest-800 hover:bg-forest-700 transition-colors">
                <Icon icon="mdi:youtube" width={18} height={18} />
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-ivory">
            Kontak
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 items-start">
              <Icon icon="mdi:map-marker" width={18} height={18} className="mt-0.5 text-teak-400" />
              <span>{footer.address}</span>
            </li>
            <li className="flex gap-3 items-center">
              <Icon icon="mdi:phone" width={18} height={18} className="text-teak-400" />
              <a href={`tel:${footer.phone.replace(/\D/g, "")}`} className="hover:text-ivory">
                {footer.phone}
              </a>
            </li>
            <li className="flex gap-3 items-center">
              <Icon icon="mdi:email" width={18} height={18} className="text-teak-400" />
              <a href={`mailto:${footer.email}`} className="hover:text-ivory">
                {footer.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-ivory">
            Menu
          </h3>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex items-center gap-2 hover:text-ivory transition-colors">
                  <Icon icon="mdi:chevron-right" width={16} height={16} className="text-teak-400" />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-ivory">
            Kenapa Kami?
          </h3>
          <ul className="space-y-2.5 text-sm">
            {["Pemandu lokal profesional", "Paket fleksibel & custom", "Armada nyaman + sopir", "Layanan 24/7"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-teak-400">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="container px-4 py-5 mx-auto text-center text-xs text-sand-400 sm:px-6">
          © {new Date().getFullYear()} Claris and City Tour Jogja. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
