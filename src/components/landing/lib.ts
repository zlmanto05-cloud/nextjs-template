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

/** Manda el evento a Meta Pixel y a GTM/GA4 (dataLayer). */
export function track(event: string, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event, params);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
