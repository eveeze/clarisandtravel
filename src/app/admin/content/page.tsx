import { prisma } from "@/lib/prisma";
import { updateSiteContent } from "./actions";

export default async function AdminContentPage() {
  const contents = await prisma.siteContent.findMany({
    orderBy: { key: "asc" },
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Konten Website</h1>
      <p className="mb-8 text-slate-500">
        Edit konten section homepage langsung dari sini.
      </p>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {contents.map((c) => (
          <div
            key={c.key}
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm"
          >
            <h2 className="mb-1 font-semibold text-slate-900">
              {c.label}
              <span className="ml-2 text-xs font-normal text-slate-400">
                key: {c.key}
              </span>
            </h2>
            <form action={updateSiteContent} className="mt-3">
              <input type="hidden" name="key" value={c.key} />
              <textarea
                name="content"
                rows={10}
                defaultValue={JSON.stringify(c.content, null, 2)}
                className="w-full px-3 py-2 font-mono text-xs rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                spellCheck={false}
              />
              <button
                type="submit"
                className="mt-3 px-4 py-2 text-sm rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
              >
                Simpan
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
