import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateGalleryItem } from "../../actions";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({
    where: { id: Number(id) },
  });
  if (!item) notFound();

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
        Edit: {item.title}
      </h1>

      <form action={updateGalleryItem} className="space-y-4">
        <input type="hidden" name="id" value={item.id} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Judul
            </label>
            <input className={inputClass} name="title" defaultValue={item.title} required />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Kategori
            </label>
            <input className={inputClass} name="category" defaultValue={item.category} required />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Image URL
          </label>
          <input className={inputClass} name="image" defaultValue={item.image} required />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Lokasi
            </label>
            <input className={inputClass} name="location" defaultValue={item.location ?? ""} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Deskripsi
            </label>
            <input className={inputClass} name="description" defaultValue={item.description ?? ""} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Urutan
            </label>
            <input className={inputClass} name="sortOrder" type="number" defaultValue={item.sortOrder} />
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
