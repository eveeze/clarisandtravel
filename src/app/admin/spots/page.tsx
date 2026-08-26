import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteSpot } from "./actions";

export default async function AdminSpotsPage() {
  const spots = await prisma.touristSpot.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Spot Wisata</h1>
          <p className="text-slate-500">{spots.length} spot</p>
        </div>
        <Link
          href="/admin/spots/new"
          className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
        >
          + Tambah Spot
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Lokasi</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {spots.map((s) => (
              <tr key={s.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {s.name}
                </td>
                <td className="px-4 py-3">
                  {s.category ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700">
                      {s.category}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3">{s.location ?? "-"}</td>
                <td className="px-4 py-3 text-slate-500">{s.slug}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/spots/${s.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteSpot(s.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
