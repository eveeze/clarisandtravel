import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteGalleryItem } from "./actions";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Galeri</h1>
          <p className="text-slate-500">{items.length} item</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
        >
          + Tambah Foto
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <div
            key={g.id}
            className="overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm"
          >
            <img
              src={g.image}
              alt={g.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-slate-900">{g.title}</h2>
              <p className="text-xs text-slate-400">
                {g.category} · {g.location ?? "-"}
              </p>
              <div className="flex gap-3 mt-3">
                <Link
                  href={`/admin/gallery/${g.id}/edit`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deleteGalleryItem(g.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-sm text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
