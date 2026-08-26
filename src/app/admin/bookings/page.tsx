import { prisma } from "@/lib/prisma";
import { updateBookingStatus, deleteBooking } from "./actions";

const statusColors: Record<string, string> = {
  baru: "bg-amber-100 text-amber-800",
  diproses: "bg-blue-100 text-blue-800",
  selesai: "bg-green-100 text-green-800",
  batal: "bg-red-100 text-red-800",
};

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking</h1>
          <p className="text-slate-500">Semua inquiry dari website</p>
        </div>
        <span className="px-3 py-1 text-sm rounded-full bg-slate-200 text-slate-700">
          {bookings.length} total
        </span>
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
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Kontak</th>
                <th className="px-4 py-3 font-medium">Paket</th>
                <th className="px-4 py-3 font-medium">Armada</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Pax</th>
                <th className="px-4 py-3 font-medium">Pesan</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-slate-100 align-top"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {b.name}
                    <span className="block text-xs text-slate-400">
                      {b.createdAt.toLocaleString("id-ID")}
                    </span>
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
                    {b.email && (
                      <span className="block text-xs text-slate-400">
                        {b.email}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{b.packageSlug ?? "-"}</td>
                  <td className="px-4 py-3">{b.vehicleName ?? "-"}</td>
                  <td className="px-4 py-3">{b.tourDate ?? "-"}</td>
                  <td className="px-4 py-3">{b.pax}</td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="truncate" title={b.message ?? ""}>
                      {b.message ?? "-"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={async (formData) => {
                        "use server";
                        await updateBookingStatus(
                          b.id,
                          String(formData.get("status")),
                        );
                      }}
                    >
                      <select
                        name="status"
                        defaultValue={b.status}
                        onChange={(e) => e.target.form?.requestSubmit()}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${statusColors[b.status] ?? "bg-slate-100 text-slate-700"}`}
                      >
                        <option value="baru">baru</option>
                        <option value="diproses">diproses</option>
                        <option value="selesai">selesai</option>
                        <option value="batal">batal</option>
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
                      <button
                        type="submit"
                        className="text-xs text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
