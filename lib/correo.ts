/**
 * Envío de correo del plan y su recordatorio.
 *
 * DISEÑO: NO HAY BASE DE DATOS, Y ES A PROPÓSITO.
 *
 * El recordatorio se programa en el mismo momento en que se envía el plan,
 * usando `scheduled_at` de Resend (admite hasta 30 días; usamos 28). Para
 * poder darse de baja hace falta cancelar ese envío programado, lo que
 * requiere su id... y ahí es donde normalmente entraría una base de datos.
 *
 * En vez de eso, el id viaja dentro del propio enlace de baja **firmado con
 * HMAC**. El endpoint comprueba la firma antes de cancelar nada, así que
 * nadie puede cancelar envíos ajenos probando ids. Resultado: el correo del
 * usuario no se almacena en ningún sitio nuestro, solo pasa por Resend para
 * la entrega.
 *
 * Menos datos guardados es menos superficie legal y menos que proteger.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE } from '../src/config/site.js';

/** 28 días: dentro del límite de 30 de Resend y coincide con el consejo
 *  que ya da la web de recalcular cada 4-6 semanas. */
export const DIAS_RECORDATORIO = 28;

export interface DatosPlan {
  kcal: number;
  prot: number;
  grasa: number;
  carb: number;
  bmr?: number;
  mant?: number;
  tipo?: string;
  peso?: number;
}

/** Lee una variable de entorno obligatoria y falla claro si no está. */
function env(nombre: string): string {
  const v = process.env[nombre];
  if (!v) throw new Error(`Falta la variable de entorno ${nombre}`);
  return String(v);
}

export function firmar(id: string): string {
  return createHmac('sha256', env('RECORDATORIO_SECRET')).update(id).digest('hex');
}

/** Comparación en tiempo constante: evita descubrir la firma a base de medir
 *  cuánto tarda en responder. */
export function firmaValida(id: string, firma: string): boolean {
  const esperada = firmar(id);
  const a = Buffer.from(esperada, 'utf8');
  const b = Buffer.from(firma, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

export function enlaceBaja(id: string): string {
  return `${SITE.url}/api/baja?id=${encodeURIComponent(id)}&f=${firmar(id)}`;
}

/** Escapa para interpolar dentro de HTML. */
export function esc(v: unknown): string {
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Validación de email deliberadamente laxa: lo estricto rechaza direcciones
 *  válidas raras y no aporta seguridad. Quien manda es Resend al entregar. */
export function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}
