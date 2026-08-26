import Link from "next/link";
import { createSpot } from "../actions";

export default function NewSpotPage() {
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
        Tambah Spot Wisata
      </h1>

      <form action={createSpot} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Nama
            </label>
            <input className={inputClass} name="name" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Slug
            </label>
            <input className={inputClass} name="slug" required />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Deskripsi
          </label>
          <textarea className={inputClass} name="description" rows={3} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Sejarah (opsional)
          </label>
          <textarea className={inputClass} name="history" rows={2} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Lokasi
            </label>
            <input className={inputClass} name="location" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Kategori
            </label>
            <input className={inputClass} name="category" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Image URL
            </label>
            <input className={inputClass} name="imageUrl" />
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
