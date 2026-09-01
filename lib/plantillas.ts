/**
 * Plantillas HTML de los dos correos.
 *
 * Se escriben a mano, sin librería de maquetación, porque los clientes de
 * correo (sobre todo Outlook) ignoran buena parte del CSS moderno. Tablas y
 * estilos en línea es lo único que se ve igual en todas partes.
 */
import { SITE } from '../src/config/site.js';
import { esc, type DatosPlan } from './correo.js';

const FONDO = '#07090b';
const LIMA = '#c8f135';
const TEXTO = '#e8ece9';
const APAGADO = '#8a9a91';

/** `urlBaja` es opcional: el recordatorio no lleva enlace de cancelación
 *  porque, cuando llega, ya no queda ningún envío pendiente que cancelar. */
function envoltorio(titulo: string, cuerpo: string, urlBaja?: string): string {
  const pie = urlBaja
    ? `<a href="${esc(urlBaja)}" style="color:${APAGADO};text-decoration:underline;">Cancelar el recordatorio</a>`
    : 'Este era el último correo. No guardamos tu dirección.';
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title></head>
<body style="margin:0;padding:0;background:${FONDO};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${FONDO};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d1014;border:1px solid #1a2330;border-radius:14px;overflow:hidden;">
  <tr><td style="padding:28px 28px 8px;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${LIMA};font-weight:bold;">
      Calculadora Fit
    </div>
  </td></tr>
  <tr><td style="padding:0 28px 28px;font-family:Arial,Helvetica,sans-serif;color:${TEXTO};font-size:15px;line-height:1.65;">
    ${cuerpo}
  </td></tr>
  <tr><td style="padding:18px 28px 26px;border-top:1px solid #1a2330;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:${APAGADO};">
    Recibes este correo porque lo pediste en
    <a href="${SITE.url}" style="color:${APAGADO};">calculadora-fit.com</a>.<br>
    ${pie}<br><br>
    Esta información es orientativa y no sustituye el consejo de un
    profesional sanitario.
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function fila(etiqueta: string, valor: string): string {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #1a2330;font-size:14px;color:${APAGADO};">${esc(etiqueta)}</td>
    <td style="padding:9px 0;border-bottom:1px solid #1a2330;font-size:14px;color:${TEXTO};text-align:right;font-weight:bold;">${esc(valor)}</td>
  </tr>`;
}

/** Correo 1: se envía al momento, con sus cifras. */
export function correoPlan(d: DatosPlan, urlBaja: string) {
  const filas = [
    d.bmr ? fila('Metabolismo basal', `${d.bmr} kcal`) : '',
    d.mant ? fila('Mantenimiento (TDEE)', `${d.mant} kcal`) : '',
    fila('Calorías objetivo', `${d.kcal} kcal`),
    d.tipo ? fila('Objetivo', d.tipo) : '',
    fila('Proteína', `${d.prot} g`),
    fila('Grasa', `${d.grasa} g`),
    fila('Carbohidratos', `${d.carb} g`),
    d.peso ? fila('Peso registrado', `${d.peso} kg`) : '',
  ].join('');

  const cuerpo = `
    <h1 style="margin:0 0 14px;font-size:21px;color:${TEXTO};">Aquí tienes tus cifras</h1>
    <p style="margin:0 0 20px;color:${APAGADO};font-size:14px;">
      Guarda este correo: es tu punto de partida. Dentro de cuatro semanas te
      escribiremos una sola vez más para recordarte que conviene revisarlas.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:22px;">${filas}</table>
    <p style="margin:0 0 18px;font-size:14px;">
      El siguiente paso es convertir esos números en comida real.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${LIMA};border-radius:9px;">
      <a href="${SITE.url}/generador-dieta" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#000;text-decoration:none;">
        Generar mi dieta
      </a>
    </td></tr></table>
    <p style="margin:22px 0 0;font-size:13px;color:${APAGADO};">
      Las cantidades del generador son <strong style="color:${TEXTO};">en crudo</strong>,
      que es como vienen las etiquetas. Pesar en cocinado descuadra los cálculos
      alrededor de un 25 %.
    </p>`;
  return {
    asunto: 'Tus calorías y macros de Calculadora Fit',
    html: envoltorio('Tus cifras', cuerpo, urlBaja),
  };
}

/** Correo 2: programado a 28 días. No repite sus cifras a propósito —
 *  la gracia es que vuelva a calcular con su peso de hoy, no con el de hace
 *  un mes. */
export function correoRecordatorio() {
  const cuerpo = `
    <h1 style="margin:0 0 14px;font-size:21px;color:${TEXTO};">Toca revisar tus números</h1>
    <p style="margin:0 0 16px;font-size:14px;">
      Hace cuatro semanas calculaste tus calorías y tus macros. Si tu peso ha
      cambiado desde entonces, <strong style="color:${TEXTO};">esas cifras ya
      no son las tuyas</strong>: el gasto energético depende de lo que pesas,
      así que baja cuando adelgazas y sube cuando ganas.
    </p>
    <p style="margin:0 0 20px;font-size:14px;color:${APAGADO};">
      Es la razón más común por la que una definición se estanca a las pocas
      semanas: se sigue comiendo para el cuerpo que se tenía, no para el que se
      tiene.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:${LIMA};border-radius:9px;">
      <a href="${SITE.url}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#000;text-decoration:none;">
        Recalcular mis cifras
      </a>
    </td></tr></table>
    <p style="margin:22px 0 0;font-size:13px;color:${APAGADO};">
      Este es el último correo que te enviamos. No hay lista de correo ni
      newsletter: guardamos lo mínimo para poder mandarte este aviso y nada más.
    </p>`;
  return {
    asunto: '¿Sigues comiendo para el peso correcto?',
    html: envoltorio('Toca revisar tus números', cuerpo),
  };
}
