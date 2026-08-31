"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { chargePayment, refundTransaction, midtransEnabled } from "@/lib/midtrans";

export type PaymentMethod = "qris" | "va_bca" | "va_bni" | "va_bri" | "va_mandiri" | "gopay" | "shopeepay" | "dana";

// Buat transaksi pembayaran dari booking (customer klik "Bayar")
export async function createChargePayment(bookingCode: string, method: PaymentMethod) {
  const booking = await prisma.booking.findUnique({
    where: { bookingCode },
  });
  if (!booking) return { error: "Booking tidak ditemukan." };
  if (!booking.totalPrice || booking.totalPrice <= 0) {
    return { error: "Total harga belum dihitung. Hubungi admin." };
  }
  if (booking.paymentStatus === "dibayar") {
    return { error: "Booking ini sudah dibayar." };
  }
  if (!midtransEnabled) {
    return { error: "Pembayaran online belum aktif. Hubungi kami via WhatsApp." };
  }

  let paymentType: "qris" | "bank_transfer" | "gopay" | "shopeepay" | "dana";
  let bank: "bca" | "bni" | "bri" | "mandiri" | "permata" | undefined;

  if (method === "qris") paymentType = "qris";
  else if (method === "va_bca") {
    paymentType = "bank_transfer";
    bank = "bca";
  } else if (method === "va_bni") {
    paymentType = "bank_transfer";
    bank = "bni";
  } else if (method === "va_bri") {
    paymentType = "bank_transfer";
    bank = "bri";
  } else if (method === "va_mandiri") {
    paymentType = "bank_transfer";
    bank = "mandiri";
  } else {
    paymentType = method as "gopay" | "shopeepay" | "dana";
  }

  try {
    const result = await chargePayment({
      orderId: booking.bookingCode,
      grossAmount: booking.totalPrice,
      customerName: booking.name,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      paymentType,
      bank,
      itemName: booking.packageName ?? booking.packageSlug ?? "Paket Tour",
    });

    if (result.statusCode !== "201" && result.statusCode !== "200") {
      return { error: "Gagal membuat transaksi pembayaran. Coba metode lain." };
    }

    // Simpan referensi transaksi + tandai menunggu bayar
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: "menunggu",
        paymentRef: result.transactionId || booking.paymentRef,
        paymentMethod: method,
        status: booking.status === "baru" ? "menunggu_bayar" : booking.status,
      },
    });

    await prisma.bookingHistory.create({
      data: {
        bookingId: booking.id,
        from: booking.paymentStatus,
        to: "payment:menunggu",
        note: `Charge ${method} via Midtrans`,
        changedBy: "system",
      },
    });

    return {
      success: true,
      payment: {
        bookingCode: booking.bookingCode,
        totalPrice: booking.totalPrice,
        method,
        vaNumber: result.vaNumber,
        bank: result.bank,
        qrDataUrl: result.qrDataUrl,
        deeplinkUrl: result.deeplinkUrl,
        transactionId: result.transactionId,
      },
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Gagal memproses pembayaran";
    return { error: `Gagal membuat pembayaran: ${msg}` };
  }
}

// Cek status transaksi dari Midtrans & sinkron ke DB (dipanggil customer)
export async function syncPaymentStatus(bookingCode: string) {
  const booking = await prisma.booking.findUnique({ where: { bookingCode } });
  if (!booking) return { error: "Booking tidak ditemukan." };
  if (!booking.paymentRef) {
    return { paymentStatus: booking.paymentStatus, status: booking.status };
  }
  if (!midtransEnabled) {
    return { paymentStatus: booking.paymentStatus, status: booking.status };
  }

  const { getTransactionStatus } = await import("@/lib/midtrans");
  try {
    const status = (await getTransactionStatus(booking.bookingCode)) as {
      transaction_status?: string;
      fraud_status?: string;
    };
    const ts = status.transaction_status ?? "";
    let paymentStatus = booking.paymentStatus;

    if (ts === "capture" || ts === "settlement") {
      paymentStatus = "dibayar";
    } else if (ts === "pending") {
      paymentStatus = "menunggu";
    } else if (ts === "deny" || ts === "cancel" || ts === "expire" || ts === "failure") {
      paymentStatus = "belum";
    } else if (ts === "refund") {
      paymentStatus = "refunded";
    }

    if (paymentStatus !== booking.paymentStatus) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          paymentStatus,
          paidAt: paymentStatus === "dibayar" ? new Date() : booking.paidAt,
          status:
            paymentStatus === "dibayar" && (booking.status === "menunggu_bayar" || booking.status === "baru")
              ? "dibayar"
              : booking.status,
        },
      });
    }
    return { paymentStatus, status: booking.status };
  } catch {
    return { paymentStatus: booking.paymentStatus, status: booking.status };
  }
}

// Refund transaksi Midtrans (admin) — full / partial
export async function refundBookingPayment(bookingId: number, amount?: number) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return { error: "Booking tidak ditemukan." };
  if (booking.paymentStatus !== "dibayar") {
    return { error: "Hanya booking yang sudah dibayar yang bisa di-refund." };
  }
  if (!midtransEnabled) {
    return { error: "Refund online belum aktif." };
  }

  const refundAmount = amount ?? booking.totalPrice ?? 0;

  try {
    await refundTransaction(booking.bookingCode, refundAmount);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Refund gagal";
    return { error: `Refund gagal: ${msg}` };
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      paymentStatus: "refunded",
      refundAmount,
      refundedAt: new Date(),
      commissionPaid: false,
      commissionPaidAt: null,
    },
  });

  await prisma.bookingHistory.create({
    data: {
      bookingId: booking.id,
      from: booking.paymentStatus,
      to: "payment:refunded",
      note: `Refund ${refundAmount.toLocaleString("id-ID")}`,
      changedBy: "admin",
    },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/earnings");
  return { success: true, refundAmount };
}
