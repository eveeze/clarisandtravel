"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { lookupBooking, type BookingLookupResult } from "@/app/actions/booking-lookup";
import { whatsappLink } from "@/lib/contact";

const STATUS_LABEL: Record<string, string> = {
  baru: "Baru",
  menunggu_bayar: "Menunggu Bayar",
  dibayar: "Dibayar",
  dikonfirmasi: "Dikonfirmasi",
  driver_ditugaskan: "Driver Ditugaskan",
  berlangsung: "Berlangsung",
  selesai: "Selesai",
  batal: "Batal",
  no_show: "No Show",
};

const STATUS_COLOR: Record<string, string> = {
  baru: "bg-amber-100 text-amber-800",
  menunggu_bayar: "bg-orange-100 text-orange-800",
  dibayar: "bg-blue-100 text-blue-800",
  dikonfirmasi: "bg-cyan-100 text-cyan-800",
  driver_ditugaskan: "bg-indigo-100 text-indigo-800",
  berlangsung: "bg-teal-100 text-teal-800",
  selesai: "bg-green-100 text-green-800",
  batal: "bg-red-100 text-red-800",
  no_show: "bg-slate-200 text-slate-700",
};

const PAYMENT_LABEL: Record<string, string> = {
  belum: "Belum Bayar",
  menunggu: "Menunggu Konfirmasi",
  dibayar: "Sudah Dibayar",
  refunded: "Dikembalikan",
};

const rupiah = (n: number | null | undefined) => (n == null ? "-" : `Rp ${n.toLocaleString("id-ID")}`);

export default function CekBookingClient() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingLookupResult | null>(null);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const res = await lookupBooking(query);
    if (res.error) {
      setError(res.error);
    } else if (res.booking) {
      setResult(res.booking);
    }
    setLoading(false);
  };

  const canPay = result && (result.paymentStatus === "belum" || result.paymentStatus === "menunggu");

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/80 border border-sand-300 text-ink-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50";

  return (
    <main className="bg-paper pt-32 pb-24 min-h-screen">
      <div className="px-6 mx-auto max-w-2xl lg:px-8">
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Layanan Pelanggan</p>
          <h1 className="mb-4 font-display text-4xl font-normal tracking-tight text-ink-900 md:text-5xl">
            Cek Booking
          </h1>
          <p className="text-lg text-ink-500">
            Masukkan kode booking atau nomor WhatsApp untuk cek status pesanan kamu.
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex gap-3 mb-10">
          <input
            className={inputClass}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Contoh: CLR-2026-0001 atau 08123456789"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : "Cari"}
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:alert-circle" className="w-5 h-5" />
              {error}
            </div>
            <p className="mt-2 text-xs text-red-400/70">
              Atau hubungi kami via{" "}
              <a href={whatsappLink()} className="underline">
                WhatsApp
              </a>
              .
            </p>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-sand-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium uppercase tracking-wider text-ink-400">Status Booking</p>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    STATUS_COLOR[result.status] ?? "bg-slate-100 text-slate-700"
                  }`}
                >
                  {STATUS_LABEL[result.status] ?? result.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-ink-400">Kode Booking</p>
                  <p className="font-semibold text-ink-900">{result.bookingCode}</p>
                </div>
                <div>
                  <p className="text-ink-400">Tanggal</p>
                  <p className="text-ink-900">{result.createdAt.toLocaleDateString("id-ID")}</p>
                </div>
                <div>
                  <p className="text-ink-400">Nama</p>
                  <p className="text-ink-900">{result.name}</p>
                </div>
                <div>
                  <p className="text-ink-400">Pembayaran</p>
                  <p className="text-ink-900">{PAYMENT_LABEL[result.paymentStatus] ?? result.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-ink-400">Paket</p>
                  <p className="text-ink-900">{result.packageName ?? "-"}</p>
                </div>
                <div>
                  <p className="text-ink-400">Tanggal Tour</p>
                  <p className="text-ink-900">{result.tourDate ?? "-"}</p>
                </div>
                <div>
                  <p className="text-ink-400">Armada</p>
                  <p className="text-ink-900">{result.vehicleName ?? "-"}</p>
                </div>
                <div>
                  <p className="text-ink-400">Jumlah Peserta</p>
                  <p className="text-ink-900">{result.pax} orang</p>
                </div>
                {result.pickupLocation && (
                  <div className="col-span-2">
                    <p className="text-ink-400">Lokasi Jemput</p>
                    <p className="text-ink-900">
                      {result.pickupLocation}
                      {result.tourTime ? ` — ${result.tourTime}` : ""}
                    </p>
                  </div>
                )}
                {result.driverName && (
                  <div className="col-span-2">
                    <p className="text-ink-400">Driver</p>
                    <p className="text-ink-900">{result.driverName}</p>
                  </div>
                )}
                <div className="col-span-2 pt-2 border-t border-sand-200">
                  <p className="text-ink-400">Total Harga</p>
                  <p className="font-display text-2xl text-gold-600">{rupiah(result.totalPrice)}</p>
                </div>
              </div>

              {canPay && (
                <Link
                  href={`/payment/${result.bookingCode}`}
                  className="mt-4 block w-full py-3 text-center rounded-xl bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
                >
                  Bayar Sekarang
                </Link>
              )}
            </div>

            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-400/30 text-sm text-ink-700">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:chat-question" className="w-5 h-5 text-gold-600" />
                Ada pertanyaan? Hubungi kami via WhatsApp.
              </div>
              <a
                href={whatsappLink("Halo saya ingin tanya tentang booking saya dengan kode")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
              >
                <Icon icon="mdi:whatsapp" className="w-4 h-4" />
                Hubungi WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
