import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { midtransEnabled } from "@/lib/midtrans";
import PaymentClient from "./payment-client";

type Params = Promise<{ code: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { code } = await props.params;
  return {
    title: `Pembayaran ${code} — Claris & City Tour Jogja`,
    robots: { index: false, follow: false },
  };
}

export default async function PaymentPage(props: { params: Params }) {
  const { code } = await props.params;
  const booking = await prisma.booking.findUnique({
    where: { bookingCode: code.toUpperCase() },
    include: { driver: { select: { name: true } } },
  });

  if (!booking) notFound();

  return (
    <PaymentClient
      booking={{
        id: booking.id,
        bookingCode: booking.bookingCode,
        name: booking.name,
        phone: booking.phone,
        packageName: booking.packageName ?? booking.packageSlug,
        totalPrice: booking.totalPrice,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        paymentMethod: booking.paymentMethod,
      }}
      midtransEnabled={midtransEnabled}
    />
  );
}
