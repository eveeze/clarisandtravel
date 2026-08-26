import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateSpot } from "../../actions";

export default async function EditSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const spot = await prisma.touristSpot.findUnique({
    where: { id: Number(id) },
  });
  if (!spot) notFound();

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/spots"
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        ← Kembali
      </Link>
      <h1 className="mt-2 mb-8 text-2xl font-bold text-slate-900">
        Edit Spot: {spot.name}
      </h1>

      <form action={updateSpot} className="space-y-4">
        <input type="hidden" name="id" value={spot.id} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Nama
            </label>
            <input
              className={inputClass}
              name="name"
              defaultValue={spot.name}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Slug
            </label>
            <input
              className={inputClass}
              name="slug"
              defaultValue={spot.slug}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Deskripsi
          </label>
          <textarea
            className={inputClass}
            name="description"
            rows={3}
            defaultValue={spot.description}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Sejarah (opsional)
          </label>
          <textarea
            className={inputClass}
            name="history"
            rows={2}
            defaultValue={spot.history ?? ""}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Lokasi
            </label>
            <input
              className={inputClass}
              name="location"
              defaultValue={spot.location ?? ""}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Kategori
            </label>
            <input
              className={inputClass}
              name="category"
              defaultValue={spot.category ?? ""}
              placeholder="Temple, Adventure, ..."
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Image URL
            </label>
            <input
              className={inputClass}
              name="imageUrl"
              defaultValue={spot.imageUrl}
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
