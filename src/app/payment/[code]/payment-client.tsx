"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { createChargePayment, syncPaymentStatus, type PaymentMethod } from "@/app/actions/payment";
import { whatsappLink } from "@/lib/contact";

type BookingInfo = {
  id: number;
  bookingCode: string;
  name: string;
  phone: string;
  packageName: string | null;
  totalPrice: number | null;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
};

const METHODS: { id: PaymentMethod; label: string; desc: string; icon: string; badge?: string }[] = [
  {
    id: "qris",
    label: "QRIS",
    desc: "Scan pakai semua e-wallet & mobile banking",
    icon: "mdi:qrcode-scan",
    badge: "Paling cepat",
  },
  { id: "va_bca", label: "BCA Virtual Account", desc: "Transfer ke nomor VA BCA", icon: "mdi:bank" },
  { id: "va_bni", label: "BNI Virtual Account", desc: "Transfer ke nomor VA BNI", icon: "mdi:bank" },
  { id: "va_bri", label: "BRI Virtual Account", desc: "Transfer ke nomor VA BRI", icon: "mdi:bank" },
  { id: "va_mandiri", label: "Mandiri Virtual Account", desc: "Transfer ke nomor VA Mandiri", icon: "mdi:bank" },
  { id: "gopay", label: "GoPay", desc: "Bayar pakai saldo GoPay", icon: "mdi:wallet" },
  { id: "shopeepay", label: "ShopeePay", desc: "Bayar pakai saldo ShopeePay", icon: "mdi:wallet" },
  { id: "dana", label: "DANA", desc: "Bayar pakai saldo DANA", icon: "mdi:wallet" },
];

const rupiah = (n: number | null | undefined) => (n == null ? "-" : `Rp ${n.toLocaleString("id-ID")}`);

const BANK_LABEL: Record<string, string> = {
  bca: "BCA",
  bni: "BNI",
  bri: "BRI",
  mandiri: "Bank Mandiri",
  permata: "Permata",
};

export default function PaymentClient({
  booking,
  midtransEnabled,
}: {
  booking: BookingInfo;
  midtransEnabled: boolean;
}) {
  const [selected, setSelected] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<{
    method: PaymentMethod;
    vaNumber?: string;
    bank?: string;
    qrDataUrl?: string;
    deeplinkUrl?: string;
  } | null>(null);
  const [payError, setPayError] = useState("");
  const [checking, setChecking] = useState(false);
  const [paid, setPaid] = useState(booking.paymentStatus === "dibayar");
  const [statusMsg, setStatusMsg] = useState("");

  const alreadyPaid = booking.paymentStatus === "dibayar" || paid;

  const handlePay = async () => {
    if (!selected) return;
    setLoading(true);
    setPayError("");
    setPayment(null);
    setStatusMsg("");

    const res = await createChargePayment(booking.bookingCode, selected);
    if (res?.error) {
      setPayError(res.error);
      setLoading(false);
      return;
    }
    if (res?.payment) setPayment(res.payment);
    setLoading(false);
  };

  const handleCheckStatus = async () => {
    setChecking(true);
    setStatusMsg("");
    const res = await syncPaymentStatus(booking.bookingCode);
    if (res?.paymentStatus === "dibayar") {
      setPaid(true);
      setStatusMsg("Pembayaran diterima! Terima kasih. 🎉");
    } else {
      setStatusMsg(res?.paymentStatus === "menunggu" ? "Pembayaran masih diproses." : "Belum terdeteksi pembayaran.");
    }
    setChecking(false);
  };

  return (
    <main className="bg-paper pt-28 pb-24 min-h-screen">
      <div className="px-6 mx-auto max-w-2xl lg:px-8">
        <div className="text-center mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Pembayaran Aman</p>
          <h1 className="mb-3 font-display text-4xl font-normal tracking-tight text-ink-900 md:text-5xl">
            Selesaikan Pembayaran
          </h1>
          <p className="text-ink-500">
            Booking: <strong className="text-ink-900">{booking.bookingCode}</strong>
          </p>
        </div>

        {alreadyPaid ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl bg-white border border-sand-200 shadow-sm text-center"
          >
            <Icon icon="mdi:check-circle" className="w-14 h-14 mx-auto mb-4 text-green-500" />
            <h2 className="mb-2 font-display text-2xl text-ink-900">Pembayaran Sudah Diterima</h2>
            <p className="text-ink-500 mb-6">Booking kamu aman. Admin akan menghubungimu untuk konfirmasi.</p>
            <Link
              href={`/cek-booking?booking=${booking.bookingCode}`}
              className="inline-block px-6 py-3 rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
            >
              Lihat Status Booking
            </Link>
          </motion.div>
        ) : !payment ? (
          <>
            <div className="mb-8 p-6 rounded-2xl bg-white border border-sand-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-ink-500">{booking.packageName ?? "Paket Tour"}</p>
                  <p className="text-xs text-ink-400">atas nama {booking.name}</p>
                </div>
                <p className="font-display text-2xl text-gold-600">{rupiah(booking.totalPrice)}</p>
              </div>
            </div>

            {!midtransEnabled ? (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-ink-700">
                <p className="mb-3">
                  Pembayaran online belum aktif. Hubungi kami via WhatsApp untuk info pembayaran manual.
                </p>
                <a
                  href={whatsappLink(`Halo, saya mau bayar booking ${booking.bookingCode}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
                >
                  <Icon icon="mdi:whatsapp" className="w-5 h-5" /> Chat WhatsApp
                </a>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="mb-3 font-display text-xl text-ink-900">Pilih Metode Pembayaran</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {METHODS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelected(m.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-colors ${
                          selected === m.id
                            ? "bg-gold-500/10 border-gold-500"
                            : "bg-white border-sand-200 hover:border-gold-400/40"
                        }`}
                      >
                        <div
                          className={`w-11 h-11 flex items-center justify-center rounded-xl ${selected === m.id ? "bg-gold-500 text-volcanic-900" : "bg-sand-100 text-ink-600"}`}
                        >
                          <Icon icon={m.icon} className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-ink-900">{m.label}</p>
                          <p className="text-sm text-ink-500">{m.desc}</p>
                        </div>
                        {m.badge && (
                          <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-green-100 text-green-800">
                            {m.badge}
                          </span>
                        )}
                        <Icon
                          icon={selected === m.id ? "mdi:radiobox-marked" : "mdi:radiobox-blank"}
                          className={`w-5 h-5 ${selected === m.id ? "text-gold-500" : "text-sand-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {payError && (
                  <p className="mb-4 px-3 py-2 text-sm rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                    {payError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handlePay}
                  disabled={!selected || loading}
                  className="w-full py-3.5 rounded-xl bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Memproses..." : selected ? "Lanjut Bayar" : "Pilih metode dulu"}
                </button>
              </>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-sand-200 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-400">Total Pembayaran</p>
                  <p className="font-display text-3xl text-gold-600">{rupiah(booking.totalPrice)}</p>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Menunggu Bayar
                </span>
              </div>

              {payment.qrDataUrl && (
                <div className="text-center mb-4">
                  <div className="inline-block p-3 rounded-2xl bg-white border border-sand-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={payment.qrDataUrl}
                      alt="QR Code pembayaran"
                      width={220}
                      height={220}
                      className="mx-auto"
                    />
                  </div>
                  <p className="mt-3 text-sm text-ink-500">
                    Scan QRIS ini pakai <strong>e-wallet</strong> (GoPay, OVO, DANA, ShopeePay) atau{" "}
                    <strong>mobile banking</strong>.
                  </p>
                </div>
              )}

              {payment.vaNumber && (
                <div className="mb-4 p-4 rounded-2xl bg-sand-50 border border-sand-200">
                  <p className="text-xs text-ink-400 mb-1">
                    {BANK_LABEL[payment.bank ?? ""] ?? payment.bank ?? "Virtual Account"}
                  </p>
                  <p className="font-display text-2xl tracking-wider text-ink-900 select-all">{payment.vaNumber}</p>
                  <p className="mt-2 text-sm text-ink-500">Transfer ke nomor VA di atas sesuai total tagihan.</p>
                </div>
              )}

              {payment.deeplinkUrl && (
                <a
                  href={payment.deeplinkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block mb-4 w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 text-center transition-colors"
                >
                  Buka Aplikasi untuk Bayar
                </a>
              )}

              <button
                type="button"
                onClick={handleCheckStatus}
                disabled={checking}
                className="w-full py-3 rounded-xl bg-volcanic-600 text-white font-semibold hover:bg-volcanic-500 disabled:opacity-50 transition-colors"
              >
                {checking ? "Mengecek..." : "Saya Sudah Bayar — Cek Status"}
              </button>

              {statusMsg && (
                <p className={`mt-3 text-sm text-center ${paid ? "text-green-600" : "text-ink-500"}`}>{statusMsg}</p>
              )}
            </div>

            {paid && (
              <Link
                href={`/cek-booking?booking=${booking.bookingCode}`}
                className="block text-center text-sm text-gold-600 hover:underline"
              >
                Lihat status booking →
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
