// WhatsApp sender abstraction.
// Provider: Fonnte (free tier, populer di Indonesia) ATAU WhatsApp Cloud API (Meta).
// Kalau WHATSAPP_API_KEY tidak diset, reminder hanya log (tidak crash).

const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY ?? "";
const WHATSAPP_PROVIDER = process.env.WHATSAPP_PROVIDER ?? "log"; // "fonnte" | "meta" | "log"

export async function sendWhatsApp(phone: string, message: string): Promise<{ success: boolean; error?: string }> {
  if (!phone) return { success: false, error: "No phone" };

  if (WHATSAPP_PROVIDER === "fonnte" && WHATSAPP_API_KEY) {
    try {
      const res = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: WHATSAPP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: phone,
          message,
          type: "text",
        }),
      });
      const data = await res.json();
      return { success: data.status ?? false, error: data.reason };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown";
      console.error("WhatsApp send failed:", msg);
      return { success: false, error: msg };
    }
  }

  if (WHATSAPP_PROVIDER === "meta" && WHATSAPP_API_KEY) {
    const phoneNumberId = process.env.META_PHONE_NUMBER_ID ?? "";
    if (!phoneNumberId) {
      return { success: false, error: "META_PHONE_NUMBER_ID not set" };
    }
    try {
      const res = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phone.replace(/\D/g, ""),
          type: "text",
          text: { body: message },
        }),
      });
      const data = await res.json();
      return { success: !data.error, error: data.error?.message };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown";
      console.error("WhatsApp Meta send failed:", msg);
      return { success: false, error: msg };
    }
  }

  // Log mode — catat di log, gak beneran dikirim
  console.log(`[WA REMINDER] To: ${phone} | Message: ${message.slice(0, 80)}...`);
  return { success: true };
}
