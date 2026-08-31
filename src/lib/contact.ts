// Satu sumber kebenaran untuk nomor WhatsApp (client-safe).
// Ganti nomor cukup di .env.local: NEXT_PUBLIC_WHATSAPP_NUMBER
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6285779536859";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
