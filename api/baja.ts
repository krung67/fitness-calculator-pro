/**
 * GET|POST /api/baja?id=<id>&f=<firma>
 *
 * Cancela el recordatorio programado. Devuelve una página, no JSON, porque
 * aquí se llega pulsando un enlace dentro de un correo.
 *
 * La firma HMAC es lo que impide cancelar envíos ajenos probando ids: sin la
 * clave del servidor no se puede fabricar un enlace válido.
 *
 * Acepta POST además de GET por el "One-Click Unsubscribe" de Gmail, que hace
 * una petición POST contra la cabecera List-Unsubscribe.
 */
import { Resend } from 'resend';
import { firmaValida } from '../lib/correo.js';
import { SITE } from '../src/config/site.js';

function pagina(titulo: string, mensaje: string, status = 200): Response {
  return new Response(
    `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${titulo}</title>
<style>
  body{margin:0;background:#07090b;color:#e8ece9;font-family:system-ui,-apple-system,sans-serif;
       display:flex;align-items:center;justify-content:center;min-height:100vh;padding:1.5rem}
  .c{max-width:440px;text-align:center}
  h1{font-size:1.35rem;margin:0 0 .8rem}
  p{color:#8a9a91;line-height:1.7;font-size:.95rem;margin:0 0 1.5rem}
  a{display:inline-block;background:#c8f135;color:#000;text-decoration:none;
    padding:.8rem 1.6rem;border-radius:9px;font-weight:700;font-size:.85rem}
</style></head>
<body><div class="c"><h1>${titulo}</h1><p>${mensaje}</p>
<a href="${SITE.url}">Volver a Calculadora Fit</a></div></body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

async function manejar(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') ?? '';
  const firma = url.searchParams.get('f') ?? '';

  if (!id || !firma || !firmaValida(id, firma)) {
    return pagina(
      'Enlace no válido',
      'Este enlace de cancelación no es correcto o está incompleto. Si lo has copiado a ' +
        'mano, prueba a pulsarlo directamente desde el correo.',
      400
    );
  }

  const clave = process.env.RESEND_API_KEY;
  if (!clave) return pagina('Error', 'No hemos podido procesar la baja.', 500);

  const r = await new Resend(clave).emails.cancel(id);

  // Si Resend da error suele ser porque el recordatorio ya se envió o ya se
  // canceló. Para quien está leyendo, el resultado es el mismo: no va a
  // recibir nada más. Se le dice eso, no un error técnico.
  if (r.error) {
    return pagina(
      'No hay nada pendiente',
      'No tienes ningún recordatorio programado: o ya se envió, o lo cancelaste antes. ' +
        'En cualquier caso, no vas a recibir más correos nuestros.'
    );
  }

  return pagina(
    'Recordatorio cancelado',
    'Hecho, no te enviaremos nada más. No guardamos tu dirección de correo en ningún ' +
      'sitio, así que no queda ningún dato tuyo por borrar.'
  );
}

export const GET = manejar;
export const POST = manejar;
