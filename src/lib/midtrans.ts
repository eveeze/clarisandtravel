import Midtrans from "midtrans-client";
import crypto from "crypto";
import QRCode from "qrcode";

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
const serverKey = process.env.MIDTRANS_SERVER_KEY ?? "";
const clientKey = process.env.MIDTRANS_CLIENT_KEY ?? "";

// CoreApi — charge langsung (QRIS/VA/e-wallet), cek status, refund, cancel
export const core = new Midtrans.CoreApi({
  isProduction,
  serverKey,
  clientKey,
});

export const midtransEnabled = Boolean(serverKey && clientKey);

export type ChargeParams = {
  orderId: string; // bookingCode — harus unique
  grossAmount: number; // total dalam Rupiah
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string;
  paymentType: "qris" | "bank_transfer" | "gopay" | "shopeepay" | "dana";
  bank?: "bca" | "bni" | "bri" | "mandiri" | "permata";
  itemName: string;
};

export type ChargeResult = {
  statusCode: string;
  transactionId: string;
  transactionStatus: string;
  vaNumber?: string;
  bank?: string;
  qrString?: string;
  qrDataUrl?: string;
  deeplinkUrl?: string;
};

// Charge langsung ke Core API — hasil dirender di halaman kita sendiri (branding Claris)
export async function chargePayment(params: ChargeParams): Promise<ChargeResult> {
  const body: Record<string, unknown> = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    item_details: [
      {
        id: params.orderId,
        name: params.itemName,
        price: params.grossAmount,
        quantity: 1,
      },
    ],
    customer_details: {
      first_name: params.customerName,
      email: params.customerEmail ?? undefined,
      phone: params.customerPhone,
    },
  };

  if (params.paymentType === "qris") {
    body.payment_type = "qris";
  } else if (params.paymentType === "bank_transfer") {
    body.payment_type = "bank_transfer";
    body.bank_transfer = { bank: params.bank ?? "bca" };
  } else {
    body.payment_type = params.paymentType;
  }

  const res = (await core.charge(body)) as Record<string, unknown> & {
    va_numbers?: { bank: string; va_number: string }[];
    actions?: { name: string; url: string }[];
    qr_string?: string;
  };

  const transactionId = String(res.transaction_id ?? "");
  const result: ChargeResult = {
    statusCode: String(res.status_code ?? ""),
    transactionId,
    transactionStatus: String(res.transaction_status ?? ""),
  };

  // QRIS — QR string dirender jadi data URL (self-hosted, branding kita)
  if (params.paymentType === "qris") {
    const qrString = res.qr_string ?? "";
    if (qrString) {
      result.qrString = qrString;
      result.qrDataUrl = await QRCode.toDataURL(qrString, {
        margin: 1,
        width: 240,
        errorCorrectionLevel: "M",
      });
    } else {
      const qrAction = res.actions?.find((a) => a.name === "generate-qr-code");
      if (qrAction?.url) {
        const img = await fetch(qrAction.url).then((r) => r.arrayBuffer());
        result.qrDataUrl = `data:image/png;base64,${Buffer.from(img).toString("base64")}`;
      }
    }
  }

  // VA — nomor virtual account dari Midtrans
  if (params.paymentType === "bank_transfer" && res.va_numbers?.[0]) {
    result.vaNumber = res.va_numbers[0].va_number;
    result.bank = res.va_numbers[0].bank;
  }

  // E-wallet — deeplink buat buka aplikasi wallet
  if (params.paymentType !== "qris" && params.paymentType !== "bank_transfer") {
    const redirect = res.actions?.find((a) => a.name === "deeplink-redirect");
    result.deeplinkUrl = redirect?.url;
  }

  return result;
}

// Cek status transaksi dari Midtrans
export async function getTransactionStatus(orderId: string) {
  return core.transaction.status(orderId);
}

// Refund FULL — Midtrans wajib settlement dulu untuk sebagian metode
export async function refundTransaction(orderId: string, amount?: number) {
  const payload = amount !== undefined ? { amount } : {};
  return core.transaction.refund(orderId, payload as never);
}

// Cancel transaksi yang masih pending (belum settlement)
export async function cancelTransaction(orderId: string) {
  return core.transaction.cancel(orderId);
}

// Verifikasi signature webhook Midtrans:
// sha512(order_id + status_code + gross_amount + ServerKey)
export function verifySignature({
  orderId,
  statusCode,
  grossAmount,
  signatureKey,
}: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}) {
  const raw = `${orderId}${statusCode}${grossAmount}${serverKey}`;
  const expected = crypto.createHash("sha512").update(raw).digest("hex");
  return expected === signatureKey;
}
