import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteBlog } from "./actions";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
          <p className="text-slate-500">{blogs.length} artikel</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
        >
          + Tulis Artikel
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {b.title}
                </td>
                <td className="px-4 py-3 text-slate-500">{b.slug}</td>
                <td className="px-4 py-3">
                  {b.date.toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/blogs/${b.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteBlog(b.id);
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
