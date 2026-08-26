import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updatePackage } from "../../actions";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await prisma.tourPackage.findUnique({
    where: { id: Number(id) },
    include: {
      itinerary: { include: { destinations: true } },
      vehicles: true,
    },
  });

  if (!pkg) notFound();

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/packages"
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        ← Kembali
      </Link>
      <h1 className="mt-2 mb-8 text-2xl font-bold text-slate-900">
        Edit Paket: {pkg.name}
      </h1>

      <form action={updatePackage} className="space-y-4">
        <input type="hidden" name="id" value={pkg.id} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Nama
            </label>
            <input
              className={inputClass}
              name="name"
              defaultValue={pkg.name}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Slug
            </label>
            <input
              className={`${inputClass} bg-slate-100`}
              value={pkg.slug}
              disabled
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
            defaultValue={pkg.description}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Harga Dasar (Rp)
            </label>
            <input
              className={inputClass}
              name="basePrice"
              type="number"
              defaultValue={pkg.basePrice}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Durasi
            </label>
            <input
              className={inputClass}
              name="duration"
              defaultValue={pkg.duration}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Tipe Turis
            </label>
            <select
              className={inputClass}
              name="touristType"
              defaultValue={pkg.touristType}
            >
              <option value="local">Local</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Thumbnail URL
          </label>
          <input
            className={inputClass}
            name="thumbnail"
            defaultValue={pkg.thumbnail}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Features (pisahkan dengan koma)
            </label>
            <input
              className={inputClass}
              name="features"
              defaultValue={pkg.features.join(", ")}
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                name="isPopular"
                defaultChecked={pkg.isPopular}
                className="w-4 h-4"
              />
              Tandai Populer
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
