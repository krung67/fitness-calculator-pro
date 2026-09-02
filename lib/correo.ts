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

/** Una comida del día con sus seis alternativas, tal y como la envía el
 *  generador de dieta. */
export interface Comida {
  nombre: string;
  kcal: number;
  prot: number;
  opciones: { nombre: string; ingredientes: string }[];
}

export interface DatosPlan {
  kcal: number;
  prot: number;
  /** Opcionales: el generador de dieta no reparte grasa y carbohidratos. */
  grasa?: number;
  carb?: number;
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

/**
 * Dominio base de los enlaces del correo.
 *
 * En producción, siempre calculadora-fit.com. En un despliegue de vista
 * previa, la propia vista previa: si no, el enlace de baja apunta a
 * producción —donde el endpoint aún no existe— y devuelve un 404, que es
 * justo con lo que nos encontramos al probarlo la primera vez.
 *
 * VERCEL_BRANCH_URL es estable para la rama; VERCEL_URL cambia en cada
 * despliegue y se usa solo como respaldo.
 */
function dominioBase(): string {
  const entorno = process.env.VERCEL_ENV;
  if (entorno && entorno !== 'production') {
    const host = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
    if (host) return `https://${host}`;
  }
  return SITE.url;
}

export function enlaceBaja(id: string): string {
  return `${dominioBase()}/api/baja?id=${encodeURIComponent(id)}&f=${firmar(id)}`;
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
