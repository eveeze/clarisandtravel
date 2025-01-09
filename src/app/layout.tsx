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
  title: "Claris and City Tour Jogja",
  description: "Website Tour and Travel Jogja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <FloatingWhatsappButton />
        <Footer />
      </body>
    </html>
  );
}
