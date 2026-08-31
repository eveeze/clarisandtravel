import { prisma } from "@/lib/prisma";
import { updateCommissionPaid } from "./actions";

const rupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default async function AdminEarningsPage() {
  const bookings = await prisma.booking.findMany({
    where: { deletedAt: null },
    include: { driver: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalCommission = bookings.reduce((acc, b) => acc + b.commission, 0);
  const earnedCommission = bookings.reduce((acc, b) => acc + (b.commissionPaid ? b.commission : 0), 0);
  const pendingCommission = bookings.reduce((acc, b) => acc + (b.commissionPaid ? 0 : b.commission), 0);

  const paidCount = bookings.filter((b) => b.commissionPaid).length;
  const pendingCount = bookings.length - paidCount;
  const selesaiCount = bookings.filter((b) => b.status === "selesai").length;
  const totalRevenue = bookings.reduce((acc, b) => acc + (b.paymentStatus === "dibayar" ? (b.totalPrice ?? 0) : 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
          <p className="text-slate-500">Tracking komisi developer dari tiap booking</p>
        </div>
        <span className="px-3 py-1 text-sm rounded-full bg-slate-200 text-slate-700">
          Komisi/booking: {rupiah(bookings[0]?.commission ?? 15000)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card label="Total Komisi (semua booking)" value={rupiah(totalCommission)} color="bg-gold-400" />
        <Card
          label="Komisi Terhitung (selesai)"
          value={rupiah(earnedCommission)}
          color="bg-green-500"
          sub={`${paidCount} booking`}
        />
        <Card
          label="Komisi Pending"
          value={rupiah(pendingCommission)}
          color="bg-amber-500"
          sub={`${pendingCount} booking`}
        />
        <Card
          label="Revenue Masuk (dibayar)"
          value={rupiah(totalRevenue)}
          color="bg-blue-500"
          sub={`${selesaiCount} selesai`}
        />
      </div>

      <div className="overflow-x-auto rounded-xl bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="px-4 py-3 font-medium">Kode</th>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Paket</th>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Pembayaran</th>
              <th className="px-4 py-3 font-medium">Komisi</th>
              <th className="px-4 py-3 font-medium">Komisi Dibayar</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-800">{b.bookingCode}</td>
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">{b.packageName ?? b.packageSlug ?? "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{b.tourDate ?? "-"}</td>
                <td className="px-4 py-3">{b.totalPrice != null ? rupiah(b.totalPrice) : "-"}</td>
                <td className="px-4 py-3">{b.status}</td>
                <td className="px-4 py-3">{b.paymentStatus}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{rupiah(b.commission)}</td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await updateCommissionPaid(b.id, !b.commissionPaid);
                    }}
                  >
                    <button
                      type="submit"
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${
                        b.commissionPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800"
                      }`}
                    >
                      {b.commissionPaid ? "Dibayar" : "Tandai dibayar"}
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

function Card({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {sub && <p className="mt-1 text-xs text-slate-400 font-medium">{sub}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} opacity-80`} />
      </div>
    </div>
  );
}
