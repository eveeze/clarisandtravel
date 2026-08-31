import { prisma } from "@/lib/prisma";
import { upsertReview, deleteReview } from "./actions";

export default async function AdminReviewsPage() {
  const [doneBookings, reviews] = await Promise.all([
    prisma.booking.findMany({
      where: { status: "selesai", deletedAt: null },
      include: { review: true, driver: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.findMany({
      include: {
        booking: { select: { name: true, bookingCode: true, packageName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const withoutReview = doneBookings.filter((b) => !b.review);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review & Rating</h1>
          <p className="text-slate-500">Input review dari booking selesai — tampil di halaman paket (verified)</p>
        </div>
        <span className="px-3 py-1 text-sm rounded-full bg-slate-200 text-slate-700">
          {reviews.length} review · {withoutReview.length} menunggu
        </span>
      </div>

      <div className="mb-8 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
        <h2 className="mb-4 font-semibold text-slate-900">Tambah Review dari Booking Selesai</h2>
        {withoutReview.length === 0 ? (
          <p className="text-sm text-slate-400">Semua booking selesai sudah punya review.</p>
        ) : (
          <form action={upsertReview} className="space-y-4">
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-600">Booking</label>
              <select
                name="bookingId"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-900"
              >
                {withoutReview.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.bookingCode} — {b.name} — {b.packageName ?? b.packageSlug}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-600">Rating (1-5)</label>
              <select
                name="rating"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-900"
              >
                <option value="5">5 ★ — Luar biasa</option>
                <option value="4">4 ★ — Bagus</option>
                <option value="3">3 ★ — Cukup</option>
                <option value="2">2 ★ — Kurang</option>
                <option value="1">1 ★ — Buruk</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs font-medium text-slate-600">Komentar</label>
              <textarea
                name="comment"
                required
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-900"
                placeholder="Pengalaman customer..."
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400"
            >
              + Tambah Review
            </button>
          </form>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-medium">Booking</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Paket</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Komentar</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 align-top">
                <td className="px-4 py-3 font-medium text-slate-800">{r.booking.bookingCode}</td>
                <td className="px-4 py-3">{r.booking.name}</td>
                <td className="px-4 py-3">{r.booking.packageName ?? "-"}</td>
                <td className="px-4 py-3">
                  <span className="text-gold-500">
                    {"★".repeat(r.rating)}
                    <span className="text-slate-200">{"★".repeat(5 - r.rating)}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 max-w-[300px]">{r.comment}</td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await deleteReview(r.id);
                    }}
                  >
                    <button type="submit" className="text-xs text-red-500 hover:underline">
                      Hapus
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
