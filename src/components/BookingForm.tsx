"use client";

import { useState } from "react";
import { createBooking } from "@/app/actions/booking";

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
  whatsappNumber = "6285779536859",
}: BookingFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [pax, setPax] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

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
      pax,
      message,
    });

    if (res?.error) {
      setStatus("error");
      setErrorMsg(res.error);
      return;
    }

    const text = [
      "*Booking Baru — Claris & Travel*",
      `Nama: ${name}`,
      `No. WA: ${phone}`,
      email ? `Email: ${email}` : "",
      packageName ? `Paket: ${packageName}` : "",
      vehicle ? `Armada: ${vehicle}` : "",
      tourDate ? `Tanggal: ${tourDate}` : "",
      `Jumlah orang: ${pax}`,
      message ? `Pesan: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("done");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-forest-800/70 border border-sand-200/20 text-ivory placeholder-sand-400/60 focus:outline-none focus:ring-2 focus:ring-teak-500";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1 text-sm font-medium text-sand-200">
            Nama Lengkap *
          </label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-sand-200">
            No. WhatsApp *
          </label>
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
          <label className="block mb-1 text-sm font-medium text-sand-200">
            Email (opsional)
          </label>
          <input
            className={inputClass}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-sand-200">
            Armada
          </label>
          <select
            className={inputClass}
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
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
          <label className="block mb-1 text-sm font-medium text-sand-200">
            Tanggal Tour
          </label>
          <input
            className={inputClass}
            type="date"
            value={tourDate}
            onChange={(e) => setTourDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-sand-200">
            Jumlah Orang
          </label>
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
        <label className="block mb-1 text-sm font-medium text-sand-200">
          Pesan (opsional)
        </label>
        <textarea
          className={inputClass}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ceritakan kebutuhan tour Anda..."
        />
      </div>

      {status === "error" && (
        <p className="px-3 py-2 text-sm rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
          {errorMsg}
        </p>
      )}

      {status === "done" ? (
        <p className="px-3 py-2 text-sm rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
          Booking tersimpan! WhatsApp udah kebuka — tinggal kirim pesannya.
        </p>
      ) : (
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors"
        >
          {status === "loading" ? "Menyimpan..." : "Booking via WhatsApp"}
        </button>
      )}
    </form>
  );
}
