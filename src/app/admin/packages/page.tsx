import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deletePackage } from "./actions";

export default async function AdminPackagesPage() {
  const packages = await prisma.tourPackage.findMany({
    orderBy: { id: "asc" },
    include: { _count: { select: { itinerary: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Paket Tour</h1>
          <p className="text-slate-500">{packages.length} paket</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
        >
          + Tambah Paket
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Harga</th>
              <th className="px-4 py-3 font-medium">Durasi</th>
              <th className="px-4 py-3 font-medium">Tipe</th>
              <th className="px-4 py-3 font-medium">Populer</th>
              <th className="px-4 py-3 font-medium">Itinerary</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3">
                  Rp {p.basePrice.toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">{p.duration}</td>
                <td className="px-4 py-3 capitalize">{p.touristType}</td>
                <td className="px-4 py-3">
                  {p.isPopular ? (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800">
                      ★ Popular
                    </span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">{p._count.itinerary} hari</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/packages/${p.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deletePackage(p.id);
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
