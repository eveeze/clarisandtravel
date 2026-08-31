import { prisma } from "@/lib/prisma";
import { updateBookingStatus, updatePaymentStatus, assignDriver, deleteBooking } from "./actions";
import { refundBookingPayment } from "@/app/actions/payment";

const STATUS_FLOW: Record<string, { label: string; color: string }> = {
  baru: { label: "Baru", color: "bg-amber-100 text-amber-800" },
  menunggu_bayar: { label: "Menunggu Bayar", color: "bg-orange-100 text-orange-800" },
  dibayar: { label: "Dibayar", color: "bg-blue-100 text-blue-800" },
  dikonfirmasi: { label: "Dikonfirmasi", color: "bg-cyan-100 text-cyan-800" },
  driver_ditugaskan: { label: "Driver Ditugaskan", color: "bg-indigo-100 text-indigo-800" },
  berlangsung: { label: "Berlangsung", color: "bg-teal-100 text-teal-800" },
  selesai: { label: "Selesai", color: "bg-green-100 text-green-800" },
  batal: { label: "Batal", color: "bg-red-100 text-red-800" },
  no_show: { label: "No Show", color: "bg-slate-200 text-slate-700" },
};

const PAYMENT_STATUS: Record<string, string> = {
  belum: "bg-slate-100 text-slate-700",
  menunggu: "bg-amber-100 text-amber-800",
  dibayar: "bg-green-100 text-green-800",
  refunded: "bg-red-100 text-red-800",
};

const rupiah = (n: number | null | undefined) => (n == null ? "-" : `Rp ${n.toLocaleString("id-ID")}`);

export default async function AdminBookingsPage() {
  const [bookings, drivers] = await Promise.all([
    prisma.booking.findMany({
      where: { deletedAt: null },
      include: {
        driver: { select: { id: true, name: true } },
        history: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.driver.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking</h1>
          <p className="text-slate-500">Status, pembayaran & penugasan driver</p>
        </div>
        <span className="px-3 py-1 text-sm rounded-full bg-slate-200 text-slate-700">{bookings.length} total</span>
      </div>

      {bookings.length === 0 ? (
        <div className="p-10 text-center rounded-xl bg-white border border-slate-200">
          <p className="text-slate-500">Belum ada booking.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="px-4 py-3 font-medium">Booking</th>
                <th className="px-4 py-3 font-medium">Kontak</th>
                <th className="px-4 py-3 font-medium">Paket</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Pembayaran</th>
                <th className="px-4 py-3 font-medium">Driver</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const s = STATUS_FLOW[b.status] ?? { label: b.status, color: "bg-slate-100 text-slate-700" };
                const p = PAYMENT_STATUS[b.paymentStatus] ?? "bg-slate-100 text-slate-700";
                return (
                  <tr key={b.id} className="border-b border-slate-100 align-top">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-900">{b.name}</span>
                      <span className="block text-xs text-slate-400">{b.bookingCode}</span>
                      <span className="block text-xs text-slate-400">{b.createdAt.toLocaleString("id-ID")}</span>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 hover:underline"
                      >
                        {b.phone}
                      </a>
                      {b.email && <span className="block text-xs text-slate-400">{b.email}</span>}
                      {b.pickupLocation && (
                        <span className="block text-xs text-slate-400">
                          Jemput: {b.pickupLocation} {b.tourTime ? `· ${b.tourTime}` : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-medium text-slate-800">{b.packageName ?? b.packageSlug ?? "-"}</span>
                      <span className="block text-xs text-slate-400">
                        {b.vehicleName ?? "-"} · {b.pax} org
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.tourDate ?? "-"}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{rupiah(b.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <form
                        action={async (formData) => {
                          "use server";
                          await updatePaymentStatus(
                            b.id,
                            String(formData.get("paymentStatus")),
                            String(formData.get("paymentMethod") || "") || undefined,
                          );
                        }}
                      >
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${p}`}>
                          {b.paymentStatus}
                        </span>
                        <select
                          name="paymentStatus"
                          defaultValue={b.paymentStatus}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="mt-1 block text-xs border border-slate-200 rounded-md px-1 py-0.5 text-slate-600 bg-white"
                        >
                          <option value="belum">belum</option>
                          <option value="menunggu">menunggu</option>
                          <option value="dibayar">dibayar</option>
                          <option value="refunded">refunded</option>
                        </select>
                        <input type="hidden" name="paymentMethod" value={b.paymentMethod ?? ""} />
                      </form>
                      {b.paymentStatus === "dibayar" && b.paymentRef && (
                        <form
                          action={async () => {
                            "use server";
                            await refundBookingPayment(b.id);
                          }}
                          className="mt-2"
                        >
                          <button type="submit" className="text-xs text-red-500 hover:underline">
                            Refund ke customer
                          </button>
                        </form>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <form
                        action={async (formData) => {
                          "use server";
                          const did = formData.get("driverId");
                          await assignDriver(b.id, did && did !== "" ? Number(did) : null);
                        }}
                      >
                        <select
                          name="driverId"
                          defaultValue={b.driverId ?? ""}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className="block text-xs border border-slate-200 rounded-md px-1 py-0.5 text-slate-600 bg-white"
                        >
                          <option value="">— pilih —</option>
                          {drivers.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <form
                        action={async (formData) => {
                          "use server";
                          await updateBookingStatus(b.id, String(formData.get("status")));
                        }}
                      >
                        <select
                          name="status"
                          defaultValue={b.status}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${s.color}`}
                        >
                          {Object.entries(STATUS_FLOW).map(([val, info]) => (
                            <option key={val} value={val}>
                              {info.label}
                            </option>
                          ))}
                        </select>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <form
                        action={async () => {
                          "use server";
                          await deleteBooking(b.id);
                        }}
                      >
                        <button type="submit" className="text-xs text-red-500 hover:underline">
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
