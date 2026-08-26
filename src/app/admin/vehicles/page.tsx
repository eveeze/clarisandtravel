import { prisma } from "@/lib/prisma";
import { updateVehicleMarketing } from "./actions";

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const inputClass =
    "w-full px-3 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Armada</h1>
      <p className="mb-8 text-slate-500">
        Atur info marketing armada yang tampil di homepage & detail paket.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={v.image}
                alt={v.name}
                className="w-16 h-12 object-contain rounded-lg bg-slate-100"
              />
              <div>
                <h2 className="font-semibold text-slate-900">{v.name}</h2>
                <p className="text-xs text-slate-400">
                  {v.capacity} · upgrade +Rp{" "}
                  {v.priceIncrement.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <form action={updateVehicleMarketing} className="space-y-3">
              <input type="hidden" name="id" value={v.id} />
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-600">
                  Label Harga
                </label>
                <input
                  className={inputClass}
                  name="priceLabel"
                  defaultValue={v.priceLabel ?? ""}
                  placeholder="Start from IDR 450K/day"
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-600">
                  Deskripsi
                </label>
                <textarea
                  className={inputClass}
                  name="description"
                  rows={2}
                  defaultValue={v.description ?? ""}
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium text-slate-600">
                  Features (pisahkan koma)
                </label>
                <input
                  className={inputClass}
                  name="features"
                  defaultValue={v.features.join(", ")}
                />
              </div>
              <div className="flex items-end justify-between">
                <div className="w-24">
                  <label className="block mb-1 text-xs font-medium text-slate-600">
                    Urutan
                  </label>
                  <input
                    className={inputClass}
                    name="sortOrder"
                    type="number"
                    defaultValue={v.sortOrder}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
