import type { Metadata } from "next";
import CekBookingClient from "./cek-booking-client";

export const metadata: Metadata = {
  title: "Cek Booking — Claris & City Tour Jogja",
  description:
    "Cek status booking kamu dengan mudah — masukkan kode booking atau nomor WhatsApp untuk melihat status pesanan tour.",
  alternates: {
    canonical: "/cek-booking",
  },
};

export default function CekBookingPage() {
  return <CekBookingClient />;
}
