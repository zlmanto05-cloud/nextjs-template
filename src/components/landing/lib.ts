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

function newEventId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Manda un evento a Meta por las dos vías con el mismo ID:
 * 1) Pixel en el navegador, 2) API de Conversiones desde nuestro servidor (/api/meta).
 * Meta junta ambos y no lo cuenta doble. sendBeacon sobrevive aunque el cliente
 * se vaya a WhatsApp en ese instante.
 */
export function metaEvent(name: string, data: Record<string, string> = {}, custom = false) {
  if (typeof window === "undefined") return;
  const eventID = newEventId();
  window.fbq?.(custom ? "trackCustom" : "track", name, data, { eventID });
  const body = JSON.stringify({ event_name: name, event_id: eventID, event_source_url: location.href, custom_data: data });
  try {
    const ok = navigator.sendBeacon?.("/api/meta", new Blob([body], { type: "application/json" }));
    if (!ok) fetch("/api/meta", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  } catch {
    /* sin conexión: el Pixel ya lo intentó */
  }
}

/**
 * Clic a WhatsApp.
 * - Meta: evento estándar "Lead" (sirve para optimizar campañas).
 * - GTM/GA4: evento "wa_click" con en qué botón fue y qué servicio.
 *   (GTM además ya registra "whatsapp_click" con su disparador de clic a wa.me.)
 */
export function trackWhatsApp(placement: string, servicio = "") {
  metaEvent("Lead", { content_name: servicio || placement, content_category: "whatsapp" });
  push({ event: "wa_click", wa_placement: placement, wa_servicio: servicio });
}

/** Vio la lista de servicios / precios (botón "Ver precios" o cambio de categoría). */
export function trackVerServicios(origen: string, categoria = "") {
  metaEvent("VerServicios", { origen, categoria }, true);
  push({ event: "ver_servicios", origen, categoria });
}

/** Bajó a la mitad de la página: interés real. */
export function trackViewContent() {
  metaEvent("ViewContent", { content_name: "landing" });
}
