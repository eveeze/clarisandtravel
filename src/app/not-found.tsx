import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 pt-24">
      <div className="text-center max-w-md">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">404</p>
        <h1 className="mb-4 font-display text-4xl text-ink-900">Halaman tidak ditemukan</h1>
        <p className="mb-6 text-ink-500">Halaman yang kamu cari gak ada atau udah dipindah.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
