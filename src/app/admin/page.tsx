import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [packages, blogs, bookings, spots] = await Promise.all([
    prisma.tourPackage.count(),
    prisma.blogPost.count(),
    prisma.booking.count({ where: { deletedAt: null } }),
    prisma.touristSpot.count(),
  ]);

  const newBookings = await prisma.booking.count({
    where: { status: "baru", deletedAt: null },
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mb-8 text-slate-500">Selamat datang di panel admin Claris & Travel.</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Paket Tour" value={packages} color="bg-blue-500" />
        <Card label="Blog" value={blogs} color="bg-green-500" />
        <Card label="Booking" value={bookings} color="bg-amber-500" sub={`${newBookings} baru`} />
        <Card label="Spot Wisata" value={spots} color="bg-purple-500" />
      </div>
    </div>
  );
}

function Card({ label, value, color, sub }: { label: string; value: number; color: string; sub?: string }) {
  return (
    <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-amber-600 font-medium">{sub}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} opacity-80`} />
      </div>
    </div>
  );
}
