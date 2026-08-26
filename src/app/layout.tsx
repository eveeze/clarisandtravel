import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/FloatingWhatsapp";

const instrument = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clarisandtravel.vercel.app"),
  title: {
    default: "Claris & City Tour Jogja — Paket Tour & Sewa Mobil Jogja",
    template: "%s | Claris & City Tour Jogja",
  },
  description:
    "Paket tour Jogja murah: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir, booking via WhatsApp.",
  keywords: [
    "tour jogja",
    "city tour jogja",
    "paket wisata jogja",
    "sewa mobil jogja",
    "sewa mobil jogja dengan sopir",
    "paket tour borobudur prambanan",
    "wisata jogja murah",
  ],
  applicationName: "Claris & City Tour Jogja",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://clarisandtravel.vercel.app",
    siteName: "Claris & City Tour Jogja",
    title: "Claris & City Tour Jogja — Paket Tour & Sewa Mobil Jogja",
    description:
      "Paket tour Jogja murah: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir, booking via WhatsApp.",
    images: [{ url: "/hero.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claris & City Tour Jogja",
    description:
      "Paket tour Jogja murah: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${instrument.variable} ${space.variable} font-body antialiased`}>
        <Navbar />
        {children}
        <FloatingWhatsappButton />
        <Footer />
      </body>
    </html>
  );
}
