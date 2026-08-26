import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/FloatingWhatsapp";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clarisandtravel.vercel.app"),
  title: {
    default: "Claris and City Tour Jogja — Paket Tour & Sewa Mobil Jogja",
    template: "%s | Claris and City Tour Jogja",
  },
  description:
    "Paket tour Jogja murah: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir, armada Sigra/Avanza/Innova/Hiace. Booking via WhatsApp.",
  keywords: [
    "tour jogja",
    "city tour jogja",
    "paket wisata jogja",
    "sewa mobil jogja",
    "sewa mobil jogja dengan sopir",
    "paket tour borobudur prambanan",
    "wisata jogja murah",
  ],
  applicationName: "Claris and City Tour Jogja",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://clarisandtravel.vercel.app",
    siteName: "Claris and City Tour Jogja",
    title: "Claris and City Tour Jogja — Paket Tour & Sewa Mobil Jogja",
    description:
      "Paket tour Jogja murah: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir, booking via WhatsApp.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Claris and City Tour Jogja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claris and City Tour Jogja — Paket Tour & Sewa Mobil Jogja",
    description:
      "Paket tour Jogja murah: city tour, Borobudur, Prambanan, hidden gems. Sewa mobil + sopir, booking via WhatsApp.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <FloatingWhatsappButton />
        <Footer />
      </body>
    </html>
  );
}
