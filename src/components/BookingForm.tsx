"use client";

import { useState } from "react";
import Link from "next/link";
import { createBooking } from "@/app/actions/booking";
import { WHATSAPP_NUMBER } from "@/lib/contact";

type BookingFormProps = {
  packageSlug?: string;
  packageName?: string;
  vehicleOptions: { name: string }[];
  whatsappNumber?: string;
};

export default function BookingForm({
  packageSlug,
  packageName,
  vehicleOptions,
  whatsappNumber = WHATSAPP_NUMBER,
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [tourTime, setTourTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [pax, setPax] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingCode, setBookingCode] = useState("");

  const openWa = () => {
    const text = [
      "*Booking Baru — Claris & Travel*",
      bookingCode ? `Kode: ${bookingCode}` : "",
      `Nama: ${name}`,
      `No. WA: ${phone}`,
      email ? `Email: ${email}` : "",
      packageName ? `Paket: ${packageName}` : "",
      vehicle ? `Armada: ${vehicle}` : "",
      tourDate ? `Tanggal: ${tourDate}` : "",
      tourTime ? `Jam jemput: ${tourTime}` : "",
      pickupLocation ? `Lokasi jemput: ${pickupLocation}` : "",
      `Jumlah orang: ${pax}`,
      message ? `Pesan: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await createBooking({
      name,
      phone,
      email,
      packageSlug,
      vehicleName: vehicle || undefined,
      tourDate,
      tourTime: tourTime || undefined,
      pickupLocation: pickupLocation || undefined,
      pax,
      message,
    });

    if (res?.error) {
      setStatus("error");
      setErrorMsg(res.error);
      return;
    }

    if (res?.bookingCode) setBookingCode(res.bookingCode);
    setStatus("done");
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-white/80 border border-sand-300 text-ink-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">Nama Lengkap *</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">No. WhatsApp *</label>
          <input
            className={inputClass}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="08xxxxxxxxxx"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">Email (opsional)</label>
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">Armada</label>
          <select className={inputClass} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            <option value="">Pilih armada...</option>
            {vehicleOptions.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">Tanggal Tour</label>
          <input className={inputClass} type="date" value={tourDate} onChange={(e) => setTourDate(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">Jam Jemput</label>
          <input className={inputClass} type="time" value={tourTime} onChange={(e) => setTourTime(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-ink-600">Lokasi Jemput</label>
        <input
          className={inputClass}
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="Hotel / penginapan / titik kumpul"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-ink-600">Jumlah Orang</label>
          <input
            className={inputClass}
            type="number"
            min={1}
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-ink-600">Pesan (opsional)</label>
        <textarea
          className={inputClass}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ceritakan kebutuhan tour Anda..."
        />
      </div>

      {status === "error" && (
        <p className="px-3 py-2 text-sm rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">{errorMsg}</p>
      )}

      {status === "done" ? (
        <div className="space-y-3">
          <p className="px-3 py-2 text-sm rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
            Booking tersimpan! Kode: <strong>{bookingCode}</strong>
          </p>

          <Link
            href={`/payment/${bookingCode}`}
            className="block w-full py-3 text-center rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
          >
            Lanjut Bayar Sekarang
          </Link>

          <button
            type="button"
            onClick={openWa}
            className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
          >
            Kirim ke WhatsApp (opsional)
          </button>
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "Menyimpan..." : "Booking Sekarang"}
        </button>
      )}
    </form>
  );
}
