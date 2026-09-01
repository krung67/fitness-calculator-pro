/**
 * POST /api/enviar-plan
 *
 * Función de Vercel. Vive en /api en la raíz del repositorio, NO dentro de
 * src/pages, y eso es deliberado: al probar el adaptador de Astro, el build
 * pasaba a formato carpeta (/privacidad/index.html en vez de
 * /privacidad.html) y el adaptador generaba su propio enrutado, dejando
 * fuera las cabeceras de seguridad y la caché de fuentes de vercel.json.
 * Habría movido 31 URLs ya indexadas. Con el directorio /api de toda la vida,
 * Astro sigue siendo 100 % estático y no se toca nada de lo que ya funciona.
 *
 * ORDEN DE OPERACIONES, QUE NO ES CASUAL:
 * Resend no deja cambiar el HTML de un correo ya programado (su API de
 * actualización solo admite id y scheduledAt), y el enlace para cancelar el
 * recordatorio necesita el id de ese recordatorio, que no existe hasta
 * crearlo. Se resuelve programando primero el recordatorio —cuyo texto no
 * necesita enlace de baja, porque cuando llegue ya no habrá nada pendiente— y
 * usando el id devuelto para construir el enlace que va en el correo
 * inmediato. Así el enlace de baja funciona sin guardar NADA por nuestra
 * parte.
 */
import { Resend } from 'resend';
import {
  DIAS_RECORDATORIO,
  emailValido,
  enlaceBaja,
  type Comida,
  type DatosPlan,
} from '../lib/correo.js';
import { correoPlan, correoRecordatorio } from '../lib/plantillas.js';

const json = (datos: unknown, status = 200) =>
  new Response(JSON.stringify(datos), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Convierte a número solo si es real y cae en un rango sensato. Nada de lo
 *  que llega del navegador se usa sin pasar por aquí. */
function num(v: unknown, min: number, max: number): number | undefined {
  const n = typeof v === 'number' ? v : parseFloat(String(v));
  return Number.isFinite(n) && n >= min && n <= max ? Math.round(n) : undefined;
}

export async function POST(request: Request): Promise<Response> {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ error: 'Petición mal formada.' }, 400);
  }

  const email = String(cuerpo.email ?? '').trim().toLowerCase();
  if (!emailValido(email)) {
    return json({ error: 'Ese correo no parece válido. Revísalo.' }, 400);
  }

  // Base legal del envío (RGPD art. 6.1.a): sin consentimiento explícito no
  // se manda nada. La casilla del formulario no viene marcada por defecto.
  if (cuerpo.consentimiento !== true) {
    return json({ error: 'Hay que marcar la casilla para poder enviártelo.' }, 400);
  }

  // Solo kcal y proteína son obligatorias: el generador de dieta trabaja con
  // esas dos y no conoce el reparto de grasa y carbohidratos.
  const kcal = num(cuerpo.kcal, 800, 8000);
  const prot = num(cuerpo.prot, 20, 500);
  if (kcal === undefined || prot === undefined) {
    return json({ error: 'Faltan cifras del cálculo o están fuera de rango.' }, 400);
  }

  const datos: DatosPlan = {
    kcal,
    prot,
    grasa: num(cuerpo.grasa, 10, 300),
    carb: num(cuerpo.carb, 0, 1200),
    bmr: num(cuerpo.bmr, 500, 5000),
    mant: num(cuerpo.mant, 800, 8000),
    peso: num(cuerpo.peso, 30, 300),
    // Lista cerrada: el texto libre no llega al correo.
    tipo: ['Definición', 'Mantenimiento', 'Volumen'].includes(String(cuerpo.tipo))
      ? String(cuerpo.tipo)
      : undefined,
  };

  // El menú es opcional y llega del generador de dieta. Se limita en tamaño y
  // se recorta cada texto: lo que entra en el correo no puede ser arbitrario.
  let menu: Comida[] | undefined;
  if (Array.isArray(cuerpo.menu)) {
    menu = (cuerpo.menu as unknown[])
      .slice(0, 6)
      .map((c) => {
        const o = c as Record<string, unknown>;
        return {
          nombre: String(o.nombre ?? '').slice(0, 40),
          kcal: num(o.kcal, 0, 5000) ?? 0,
          prot: num(o.prot, 0, 400) ?? 0,
          opciones: Array.isArray(o.opciones)
            ? (o.opciones as unknown[]).slice(0, 6).map((p) => {
                const q = p as Record<string, unknown>;
                return {
                  nombre: String(q.nombre ?? '').slice(0, 80),
                  ingredientes: String(q.ingredientes ?? '').slice(0, 300),
                };
              })
            : [],
        };
      })
      .filter((c) => c.nombre && c.opciones.length);
    if (!menu.length) menu = undefined;
  }

  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CORREO_REMITENTE;
  if (!clave || !remitente) {
    console.error('Faltan RESEND_API_KEY o CORREO_REMITENTE');
    return json({ error: 'El envío de correo no está configurado.' }, 500);
  }
  const resend = new Resend(clave);

  try {
    // 1. El recordatorio, programado, con su texto ya definitivo.
    const cuando = new Date(Date.now() + DIAS_RECORDATORIO * 86400_000).toISOString();
    const rec = correoRecordatorio();
    const prog = await resend.emails.send({
      from: remitente,
      to: email,
      subject: rec.asunto,
      html: rec.html,
      scheduledAt: cuando,
    });
    if (prog.error || !prog.data?.id) {
      console.error('Resend (recordatorio):', prog.error);
      return json({ error: 'No hemos podido programar el recordatorio.' }, 502);
    }

    // 2. Ya con su id, el enlace que permite cancelarlo.
    const baja = enlaceBaja(prog.data.id);

    // 3. Y el correo con sus cifras, ahora mismo.
    const plan = correoPlan(datos, baja, menu);
    const envio = await resend.emails.send({
      from: remitente,
      to: email,
      subject: plan.asunto,
      html: plan.html,
      headers: {
        'List-Unsubscribe': `<${baja}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });
    if (envio.error) {
      // Si el plan falla, se cancela el recordatorio: nadie debería recibir el
      // aviso de un correo que nunca le llegó.
      console.error('Resend (plan):', envio.error);
      await resend.emails.cancel(prog.data.id).catch(() => {});
      return json({ error: 'No hemos podido enviar el correo.' }, 502);
    }

    return json({ ok: true, dias: DIAS_RECORDATORIO });
  } catch (e) {
    console.error('Fallo enviando el plan:', e);
    return json({ error: 'Algo ha fallado al enviar. Inténtalo en un rato.' }, 500);
  }
}
