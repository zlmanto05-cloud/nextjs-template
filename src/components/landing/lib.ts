export const WA_NUMBER = "529934001413";

export function waLink(text: string, medium: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}&utm_source=web&utm_medium=${medium}&utm_campaign=lanzamiento`;
}

declare global {
  interface Window {
    fbq?: (...a: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

function push(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Clic a WhatsApp.
 * - Meta Pixel: evento estándar "Lead" (sirve para optimizar campañas).
 * - GTM/GA4: evento "wa_click" con en qué botón fue y qué servicio.
 *   (GTM además ya registra "whatsapp_click" con su disparador de clic a wa.me.)
 */
export function trackWhatsApp(placement: string, servicio = "") {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Lead", { content_name: servicio || placement, content_category: "whatsapp" });
  push({ event: "wa_click", wa_placement: placement, wa_servicio: servicio });
}

/** Vio la lista de servicios / precios (botón "Ver precios" o cambio de categoría). */
export function trackVerServicios(origen: string, categoria = "") {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", "VerServicios", { origen, categoria });
  push({ event: "ver_servicios", origen, categoria });
}

/** Bajó a la mitad de la página: interés real. */
export function trackViewContent() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "ViewContent", { content_name: "landing" });
}
