import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignature, midtransEnabled } from "@/lib/midtrans";

// Midtrans HTTP Notification (webhook)
// Endpoint: POST /api/midtrans/webhook
export async function POST(request: Request) {
  if (!midtransEnabled) {
    return NextResponse.json({ status: "error", message: "Midtrans not configured" }, { status: 503 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ status: "error", message: "Invalid JSON" }, { status: 400 });
  }

  const orderId = String(payload.order_id ?? "");
  const statusCode = String(payload.status_code ?? "");
  const grossAmount = String(payload.gross_amount ?? "").replace(/[.,]00$/, "");
  const signatureKey = String(payload.signature_key ?? "");
  const transactionStatus = String(payload.transaction_status ?? "");
  const fraudStatus = String(payload.fraud_status ?? "");
  const paymentType = String(payload.payment_type ?? "");
  const transactionId = String(payload.transaction_id ?? "");

  // Verifikasi signature biar gak di-spoof
  if (!verifySignature({ orderId, statusCode, grossAmount, signatureKey })) {
    return NextResponse.json({ status: "error", message: "Invalid signature" }, { status: 401 });
  }

  const booking = await prisma.booking.findUnique({
    where: { bookingCode: orderId },
  });
  if (!booking) {
    return NextResponse.json({ status: "error", message: "Booking not found" }, { status: 404 });
  }

  // Map status Midtrans → status booking
  let paymentStatus = booking.paymentStatus;
  let bookingStatus = booking.status;
  const note = `Midtrans webhook: ${transactionStatus}/${fraudStatus}`;

  if (transactionStatus === "capture" || transactionStatus === "settlement") {
    if (fraudStatus === "accept" || transactionStatus === "settlement") {
      paymentStatus = "dibayar";
      if (bookingStatus === "menunggu_bayar" || bookingStatus === "baru") {
        bookingStatus = "dibayar";
      }
    } else {
      paymentStatus = "menunggu"; // fraud challenge
    }
  } else if (transactionStatus === "pending") {
    paymentStatus = "menunggu";
  } else if (
    transactionStatus === "deny" ||
    transactionStatus === "cancel" ||
    transactionStatus === "expire" ||
    transactionStatus === "failure"
  ) {
    paymentStatus = "belum";
    if (bookingStatus === "menunggu_bayar") {
      bookingStatus = "baru";
    }
  } else if (transactionStatus === "refund") {
    paymentStatus = "refunded";
  }

  // Komisi terhitung hanya jika booking SELESAI dan sudah DIBAYAR
  const commissionPaid = paymentStatus === "dibayar" && bookingStatus === "selesai";

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      paymentStatus,
      status: bookingStatus,
      paymentMethod: paymentType || booking.paymentMethod,
      paymentRef: transactionId || booking.paymentRef,
      paidAt: paymentStatus === "dibayar" ? new Date() : booking.paidAt,
      refundedAt: paymentStatus === "refunded" ? new Date() : booking.refundedAt,
      commissionPaid,
      commissionPaidAt: commissionPaid ? new Date() : booking.commissionPaidAt,
    },
  });

  await prisma.bookingHistory.create({
    data: {
      bookingId: booking.id,
      from: booking.paymentStatus,
      to: `payment:${paymentStatus}`,
      note,
      changedBy: "system",
    },
  });

  return NextResponse.json({ status: "ok" });
}
