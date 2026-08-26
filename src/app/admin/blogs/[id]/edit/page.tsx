import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updateBlog } from "../../actions";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await prisma.blogPost.findUnique({
    where: { id: Number(id) },
  });

  if (!blog) notFound();

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/blogs"
        className="text-sm text-slate-500 hover:text-slate-700"
      >
        ← Kembali
      </Link>
      <h1 className="mt-2 mb-8 text-2xl font-bold text-slate-900">
        Edit Artikel
      </h1>

      <form action={updateBlog} className="space-y-4">
        <input type="hidden" name="id" value={blog.id} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Judul
            </label>
            <input
              className={inputClass}
              name="title"
              defaultValue={blog.title}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Slug (URL)
            </label>
            <input
              className={inputClass}
              name="slug"
              defaultValue={blog.slug}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Excerpt / Ringkasan
          </label>
          <textarea
            className={inputClass}
            name="excerpt"
            rows={2}
            defaultValue={blog.excerpt}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Cover Image URL
          </label>
          <input
            className={inputClass}
            name="coverImage"
            defaultValue={blog.coverImage}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Konten (Markdown)
          </label>
          <textarea
            className={`${inputClass} font-mono`}
            name="contentMd"
            rows={18}
            defaultValue={blog.contentMd}
          />
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
