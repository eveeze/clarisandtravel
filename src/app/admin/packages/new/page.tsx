import Link from "next/link";
import { createPackage } from "./actions";

export default function NewPackagePage() {
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
        Tambah Paket Tour
      </h1>

      <form action={createPackage} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Nama
            </label>
            <input className={inputClass} name="name" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Slug (URL)
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Harga Dasar (Rp)
            </label>
            <input
              className={inputClass}
              name="basePrice"
              type="number"
              defaultValue={250000}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Durasi
            </label>
            <input className={inputClass} name="duration" placeholder="1 Day" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Tipe Turis
            </label>
            <select className={inputClass} name="touristType" defaultValue="local">
              <option value="local">Local</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Thumbnail URL
            </label>
            <input className={inputClass} name="thumbnail" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Features (koma)
            </label>
            <input className={inputClass} name="features" />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" name="isPopular" className="w-4 h-4" />
          Tandai Populer
        </label>

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
