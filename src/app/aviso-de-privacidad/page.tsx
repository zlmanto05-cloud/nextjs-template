import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Mis Papos",
  description: "Aviso de privacidad de Mis Papos, limpieza y cuidado de tenis en Villahermosa, Tabasco.",
  alternates: { canonical: "/aviso-de-privacidad" },
};

// Basado en el aviso de Tintorerías Max (tintoreriasvillahermosa.com.mx/aviso-de-privacidad), adaptado a Mis Papos.
const RESPONSABLE = "Marco Antonio López Zurita (Mis Papos)";
const ABREVIATURA = "Mis Papos";
const DOMICILIO = "Calle 23 de Agosto, Col. Jesús García, C.P. 86040, Villahermosa, Centro, Tabasco, México";
const SITIO = "www.mispapos.com";
const WHATSAPP = "https://wa.me/529934001413";
const TELEFONO = "993 400 1413";
const SUCURSALES = "Paseo Usumacinta y Ciudad Deportiva (Plaza Mega Soriana), en Villahermosa, Tabasco";
const ACTUALIZADO = "26 de noviembre de 2026";

const FINALIDADES = [
  {
    finalidad: "Ofrecerle una mejor experiencia en nuestro sitio web y medir nuestros anuncios.",
    datos: "Cookies, dirección IP, tipo de navegador y dispositivo, y datos de navegación (páginas vistas y botones que toca).",
  },
  {
    finalidad: "Atender su interés de ponerse en contacto o pedir una cotización por WhatsApp o redes sociales.",
    datos: "Nombre, teléfono, mensajes y, en su caso, fotos de los artículos a cotizar.",
  },
  {
    finalidad: "Brindarle el servicio de limpieza y cuidado de tenis, botas, mochilas, gorras y bolsas en sucursal.",
    datos: "Nombre, teléfono, artículos recibidos, número de nota y fotos del estado en que recibimos sus artículos.",
  },
  {
    finalidad: "Aplicar el descuento para socios de Anytime Fitness.",
    datos: "Nombre y la llave o credencial de socio que usted nos muestra (solo la verificamos; no la copiamos ni la guardamos).",
  },
  {
    finalidad: "Atención de quejas, aclaraciones e incidencias por los servicios.",
    datos: "Nombre, teléfono, número de nota, fotos del artículo y descripción de la incidencia.",
  },
  {
    finalidad: "Hacerle llegar promociones o información publicitaria de Mis Papos.",
    datos: "Nombre y teléfono.",
  },
];

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display mb-4 text-3xl leading-none md:text-4xl">{titulo}</h2>
      <div className="space-y-3 leading-relaxed text-black/70">{children}</div>
    </section>
  );
}

const enlace = "font-semibold text-black underline decoration-[var(--accent)] decoration-2 underline-offset-4";

export default function AvisoDePrivacidad() {
  return (
    <main className="bg-white">
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-28 md:pt-36">
        <p className="font-tag mb-4 inline-flex items-center gap-2 text-[11px] text-black/55">
          <span className="h-2 w-2 bg-[var(--accent)]" /> Legal
        </p>
        <h1 className="font-display text-5xl leading-[0.9] md:text-7xl">Aviso de privacidad</h1>
        <p className="mt-4 text-sm text-black/50">
          Aplica al sitio web, a la atención por WhatsApp y redes sociales, y a nuestras sucursales.
        </p>

        <div className="mt-10 space-y-3 leading-relaxed text-black/70">
          <p>
            <strong className="text-black">{RESPONSABLE}</strong> (en lo sucesivo “{ABREVIATURA}”), con domicilio en {DOMICILIO}, es
            responsable del tratamiento de sus datos personales y le hace saber a los usuarios del sitio web {SITIO} y a
            los clientes de nuestras sucursales {SUCURSALES}, que {ABREVIATURA} obtiene sus datos personales cuando usted
            navega en el sitio, nos contacta por WhatsApp o redes sociales, contrata un servicio en sucursal o presenta
            una queja.
          </p>
          <p>
            En términos de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la “Ley”),
            los datos personales que nos proporcione tendrán un tratamiento legítimo, controlado e informado, a efecto de
            garantizar su privacidad y su derecho a la autodeterminación informativa.
          </p>
        </div>

        <Seccion titulo="Qué datos recabamos y para qué">
          <p>{ABREVIATURA} podrá solicitar y tratar los siguientes datos, dependiendo de la finalidad:</p>
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <table className="w-full text-sm">
              <thead className="bg-black text-left text-white">
                <tr>
                  <th className="w-1/2 p-3 font-semibold">Finalidad</th>
                  <th className="p-3 font-semibold">Datos tratados</th>
                </tr>
              </thead>
              <tbody>
                {FINALIDADES.map((f) => (
                  <tr key={f.finalidad} className="border-t border-black/10 align-top even:bg-[var(--paper)]">
                    <td className="p-3 text-black">{f.finalidad}</td>
                    <td className="p-3 text-black/60">{f.datos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Las finalidades de promociones e información publicitaria y de medición de anuncios son secundarias: usted
            puede oponerse a ellas en cualquier momento, sin que ello afecte las demás finalidades ni su relación con
            nosotros.
          </p>
          <p>
            {ABREVIATURA} no recaba datos personales sensibles. No toda la información que se solicita es obligatoria,
            sino únicamente aquella que así se le indique al momento de recabarla.
          </p>
        </Seccion>

        <Seccion titulo="Cookies y tecnologías de medición">
          <p>
            Las cookies son pequeños archivos de texto que un sitio web guarda en su dispositivo para recordar su
            actividad y preferencias. Los web beacons y píxeles son etiquetas que permiten contar visitas y medir el
            interés en nuestros servicios.
          </p>
          <p>
            En este sitio usamos Google Tag Manager y Google Analytics (Google), y el Píxel de Meta y la API de
            Conversiones de Meta (Facebook e Instagram), para saber cuántas personas visitan el sitio, qué servicios
            consultan y si tocan el botón de WhatsApp, y así mostrar anuncios más relevantes. La API de Conversiones
            envía esos mismos eventos a Meta desde nuestro servidor, junto con la dirección IP, el tipo de navegador y
            los identificadores de cookies de Meta. No enviamos su nombre, teléfono ni correo.
          </p>
          <p>
            La mayoría de los navegadores le permiten desactivar o borrar las cookies. Si lo hace, el sitio seguirá
            funcionando. También puede administrar sus preferencias de anuncios en la configuración de su cuenta de
            Google y de Meta.
          </p>
        </Seccion>

        <Seccion titulo="Cómo los protegemos">
          <p>
            {ABREVIATURA} ha establecido medidas de seguridad administrativas, técnicas y físicas para proteger sus datos
            personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado.
          </p>
        </Seccion>

        <Seccion titulo="Con quiénes los compartimos">
          <p>
            Para cumplir las finalidades descritas, sus datos podrán ser remitidos a proveedores que nos prestan
            servicios, nacionales o extranjeros, como Google (medición del sitio), Meta y WhatsApp (mensajería y
            publicidad) y Vercel (hospedaje del sitio). Estos proveedores solo usarán los datos para las mismas
            finalidades de este aviso.
          </p>
          <p>
            Estas remisiones no requieren su consentimiento por encontrarse dentro de las excepciones que marca la Ley;
            sin embargo, es importante para nosotros que usted las conozca. No vendemos ni rentamos sus datos.
          </p>
        </Seccion>

        <Seccion titulo="Sus derechos">
          <p>
            Usted tiene derecho a ejercer en todo momento sus derechos de{" "}
            <strong className="text-black">acceso, rectificación, cancelación u oposición</strong> (derechos ARCO), así
            como a revocar su consentimiento, conforme a la Ley y a este aviso. Para hacerlo, envíe su solicitud:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Por teléfono o WhatsApp al número de Mis Papos{" "}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={enlace}>
                {TELEFONO}
              </a>
              ,
            </li>
            <li>En cualquiera de nuestras sucursales, o</li>
            <li>Por escrito en el domicilio: {DOMICILIO}.</li>
          </ul>
          <p>Para atender su solicitud será necesario:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Acreditar su identidad, o la de su representante legal, con copia de una identificación oficial y, en su
              caso, el documento que acredite las facultades del representante.
            </li>
            <li>Describir con claridad los datos y el derecho que desea ejercer.</li>
            <li>Indicar el medio por el que desea recibir la respuesta: teléfono, WhatsApp o en sucursal.</li>
          </ol>
          <p>
            {ABREVIATURA} responderá en un máximo de 20 días hábiles, o le notificará la ampliación de este plazo
            cuando existan causas que lo justifiquen.
          </p>
          <p>
            También puede limitar el uso de sus datos para promociones avisándonos por los mismos medios. Además, puede
            inscribirse en el Registro Público de Consumidores previsto en la Ley Federal de Protección al Consumidor.
          </p>
        </Seccion>

        <Seccion titulo="Actualizaciones y dudas">
          <p>
            Este aviso puede actualizarse. Cualquier modificación se publicará en esta misma página. Última
            actualización: {ACTUALIZADO}.
          </p>
          <p>
            Si tiene alguna duda sobre este aviso de privacidad, llámenos o escríbanos por WhatsApp al número de
            Mis Papos{" "}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={enlace}>
              {TELEFONO}
            </a>
            .
          </p>
        </Seccion>

        <p className="mt-14">
          <Link href="/" className="font-tag text-[12px] text-black hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </article>
      <Footer />
    </main>
  );
}
