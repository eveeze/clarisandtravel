"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  // Logging error untuk monitoring production
  console.error("[GlobalError]", error.message, error.digest);

  return (
    <html lang="id">
      <body className="font-body antialiased bg-paper">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Terjadi Kesalahan</p>
            <h1 className="mb-4 font-display text-4xl text-ink-900">Halaman bermasalah</h1>
            <p className="mb-6 text-ink-500">
              Terjadi kendala teknis. Coba muat ulang — kalau masih bermasalah, hubungi kami via WhatsApp.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 rounded-lg bg-gold-500 text-volcanic-900 font-semibold hover:bg-gold-400 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
