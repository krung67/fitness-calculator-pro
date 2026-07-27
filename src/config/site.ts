/**
 * Fuente única de verdad de los datos del sitio.
 *
 * Todo lo que aparezca en más de una página va aquí. Si cambia el email o la
 * dirección, se toca este archivo y se actualiza en toda la web.
 *
 * ⚠️ Los campos marcados como PENDIENTE son obligatorios por ley
 *    (LSSI-CE art. 10 y RGPD art. 13). Rellénalos antes de publicar.
 */

export const SITE = {
  nombre: 'Calculadora Fit',
  dominio: 'calculadora-fit.com',
  url: 'https://calculadora-fit.com',
  email: 'enriqueg.digital@gmail.com',

  /** Titular del sitio. Persona física. */
  titular: {
    /** Nombre y apellidos completos, tal y como figuran en tu DNI. */
    nombre: 'Xabier Enrique Garcia',
    /**
     * NIF/DNI con la letra. Ej.: 12345678A
     *
     * DEJADO VACÍO A PROPÓSITO (decisión de Enrique, julio 2026).
     * La LSSI-CE art. 10.1.f lo exige a quien tiene actividad económica, y
     * aquí la hay (afiliados de Amazon + AdSense). Omitirlo es una
     * infracción leve. Se asume conscientemente: es práctica habitual en
     * webs personales pequeñas y la persecución es casi inexistente.
     *
     * Para volver a incluirlo basta con escribir el NIF aquí: la fila
     * reaparece sola en /aviso-legal. No hay que tocar nada más.
     */
    nif: '',
    /**
     * Domicilio a efectos de notificaciones. La ley exige una dirección
     * postal; basta con el municipio y la provincia si prefieres no publicar
     * el número exacto de tu casa.
     */
    domicilio: 'Vitoria-Gasteiz, Álava, España',
  },

  /** ID de editor de AdSense. */
  adsenseClient: 'ca-pub-6100190147209730',

  /** Fecha de la última revisión de los textos legales. */
  legalActualizado: '2026-07-27',
} as const;

/**
 * Menú principal. Un solo sitio donde añadir o quitar enlaces.
 * Nunca añadas aquí una ruta que no exista: sería un enlace roto en TODAS
 * las páginas del sitio, porque el menú vive en el Layout compartido.
 */
export const NAV = [
  { href: '/', texto: 'Calculadora' },
  { href: '/metodo', texto: 'Método' },
  { href: '/sobre-nosotros', texto: 'Sobre nosotros' },
  { href: '/contacto', texto: 'Contacto' },
] as const;

/** Enlaces legales del pie. */
export const NAV_LEGAL = [
  { href: '/aviso-legal', texto: 'Aviso legal' },
  { href: '/privacidad', texto: 'Privacidad' },
  { href: '/cookies', texto: 'Cookies' },
] as const;
