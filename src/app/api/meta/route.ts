import { NextRequest, NextResponse } from "next/server";

/**
 * Meta Conversions API (servidor).
 * Recibe los mismos eventos que el Pixel y los manda a Meta desde Vercel,
 * para no perder datos de iPhone/Safari. El Pixel y este envío comparten
 * `event_id`, así Meta no los cuenta doble.
 *
 * Variables de entorno (se ponen en Vercel, nunca en el código):
 *   META_CAPI_TOKEN        token de acceso de la API de Conversiones (obligatorio)
 *   META_TEST_EVENT_CODE   código de "Probar eventos" (opcional, solo para pruebas)
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PIXEL_ID = "1022886750323424";
const ALLOWED = new Set(["PageView", "ViewContent", "Lead", "VerServicios"]);

type Body = {
  event_name?: string;
  event_id?: string;
  event_source_url?: string;
  custom_data?: Record<string, string>;
};

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return new NextResponse(null, { status: 204 }); // aún sin token: no hace nada

  let body: Body;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = String(body.event_name || "");
  const id = String(body.event_id || "").slice(0, 64);
  if (!ALLOWED.has(name) || !id) return NextResponse.json({ ok: false }, { status: 400 });

  // Solo aceptamos eventos que vienen de nuestro propio sitio
  const url = String(body.event_source_url || "").slice(0, 500);
  const host = (() => { try { return new URL(url).hostname; } catch { return ""; } })();
  if (!/(^|\.)mispapos\.com$|\.vercel\.app$|^localhost$/.test(host)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const custom: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.custom_data || {}).slice(0, 8)) {
    custom[String(k).slice(0, 40)] = String(v).slice(0, 120);
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined;
  const ua = req.headers.get("user-agent") || undefined;
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: id,
        action_source: "website",
        event_source_url: url,
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          ...(fbp ? { fbp } : {}),
          ...(fbc ? { fbc } : {}),
        },
        custom_data: custom,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const r = await fetch(`https://graph.facebook.com/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error("Meta CAPI error", r.status, (await r.text()).slice(0, 300));
    return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
  } catch (e) {
    console.error("Meta CAPI fetch failed", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
