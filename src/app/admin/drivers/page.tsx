import { prisma } from "@/lib/prisma";
import { createDriver, updateDriver, deleteDriver } from "./actions";

const STATUS_BADGE: Record<string, string> = {
  tersedia: "bg-green-100 text-green-800",
  bertugas: "bg-amber-100 text-amber-800",
  cuti: "bg-red-100 text-red-800",
};

export default async function AdminDriversPage() {
  const drivers = await prisma.driver.findMany({
    include: { _count: { select: { bookings: true } } },
    orderBy: { name: "asc" },
  });

  const inputClass =
    "w-full px-3 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Driver</h1>
          <p className="text-slate-500">{drivers.length} driver terdaftar</p>
        </div>
      </div>

      <div className="mb-8 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-900">Tambah Driver</h2>
        <form action={createDriver} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block mb-1 text-xs font-medium text-slate-600">Nama</label>
            <input className={inputClass} name="name" required placeholder="Pak Budi" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-medium text-slate-600">No. WA</label>
            <input className={inputClass} name="phone" required placeholder="62812345678" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-medium text-slate-600">Status</label>
            <select className={inputClass} name="status" defaultValue="tersedia">
              <option value="tersedia">tersedia</option>
              <option value="bertugas">bertugas</option>
              <option value="cuti">cuti</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="px-4 py-2 w-full text-sm rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
            >
              + Tambah
            </button>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <label className="block mb-1 text-xs font-medium text-slate-600">Catatan (opsional)</label>
            <input className={inputClass} name="notes" placeholder="Hafal jalur sepi, bisa bahasa Inggris..." />
          </div>
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Kontak</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Booking</th>
              <th className="px-4 py-3 font-medium">Catatan</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b border-slate-100 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">{d.name}</td>
                <td className="px-4 py-3">
                  <a
                    href={`https://wa.me/${d.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    {d.phone}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <form
                    action={async (formData) => {
                      "use server";
                      await updateDriver(d.id, { status: String(formData.get("status")) });
                    }}
                  >
                    <select
                      name="status"
                      defaultValue={d.status}
                      onChange={(e) => e.target.form?.requestSubmit()}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${STATUS_BADGE[d.status] ?? "bg-slate-100 text-slate-700"}`}
                    >
                      <option value="tersedia">tersedia</option>
                      <option value="bertugas">bertugas</option>
                      <option value="cuti">cuti</option>
                    </select>
                  </form>
                </td>
                <td className="px-4 py-3">{d._count.bookings} booking</td>
                <td className="px-4 py-3 text-slate-500">{d.notes ?? "-"}</td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await deleteDriver(d.id);
                    }}
                  >
                    <button type="submit" className="text-xs text-red-500 hover:underline">
                      Hapus
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
