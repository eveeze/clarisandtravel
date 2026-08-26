import Link from "next/link";
import { createGalleryItem } from "../actions";

export default function NewGalleryItemPage() {
  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/gallery"
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        ← Kembali
      </Link>
      <h1 className="mt-2 mb-8 text-2xl font-bold text-slate-900">
        Tambah Foto Galeri
      </h1>

      <form action={createGalleryItem} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Judul
            </label>
            <input className={inputClass} name="title" required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Kategori
            </label>
            <input className={inputClass} name="category" required />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Image URL
          </label>
          <input className={inputClass} name="image" required />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Lokasi
            </label>
            <input className={inputClass} name="location" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Deskripsi
            </label>
            <input className={inputClass} name="description" />
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