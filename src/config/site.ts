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
  // Buzón del propio dominio, alojado en Ionos. Depende de los registros MX
  // de la zona DNS: si se borran, deja de entrar correo aquí.
  email: 'enrique.digital@calculadora-fit.com',

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
/**
 * Menú principal: las herramientas primero, porque son a lo que viene la
 * gente. "Sobre nosotros" se movió al pie al llegar a cuatro calculadoras —
 * con siete elementos el menú se partía en tres líneas en móvil. Sigue
 * enlazada desde todas las páginas, que es lo que exige AdSense.
 *
 * Si algún día hay más de cuatro calculadoras, toca crear una página
 * /calculadoras que las agrupe en lugar de seguir alargando esto.
 */
export const NAV = [
  { href: '/', texto: 'Calorías' },
  { href: '/imc', texto: 'IMC' },
  { href: '/grasa-corporal', texto: 'Grasa corporal' },
  { href: '/masa-muscular', texto: 'Masa muscular' },
  { href: '/metodo', texto: 'Método' },
  { href: '/contacto', texto: 'Contacto' },
] as const;

/**
 * Índice de guías. Fuente única: de aquí salen la página /guias, las tarjetas
 * de la portada y los enlaces entre guías. Añadir una guía es añadir una
 * línea aquí; el sitemap se genera solo a partir de las páginas.
 */
export const GUIAS = [
  {
    href: '/guias/cuanta-proteina-necesito-al-dia',
    titulo: 'Cuánta proteína necesito al día',
    resumen:
      'Tu cifra exacta según lo que pesas y lo que entrenas, con tabla para 60, 70, 80, 90 y 100 kg. Y por qué probablemente sea menos de lo que te han dicho.',
    icono: '🥩',
  },
  {
    href: '/guias/deficit-calorico-como-calcularlo',
    titulo: 'Déficit calórico: cómo calcularlo',
    resumen:
      'Cuántas calorías recortar, cómo saber si funciona, qué tocar cuando te estancas y por qué casi nadie llega al final de una definición.',
    icono: '📉',
  },
  {
    href: '/guias/proteina-de-los-alimentos',
    titulo: 'Proteína de los alimentos',
    resumen:
      'Tabla por 100 g y por unidad: huevo, pollo, atún, yogur griego… y el fallo de pesar en cocinado que descuadra los cálculos de casi todo el mundo.',
    icono: '📋',
  },
  {
    href: '/guias/por-que-no-bajo-de-peso',
    titulo: 'Por qué no bajo de peso',
    resumen:
      'Cinco causas reales ordenadas por probabilidad, cómo comprobar si tu déficit existe de verdad y qué ajustar antes de recortar más calorías.',
    icono: '⚖️',
  },
  {
    href: '/guias/como-pesar-la-comida',
    titulo: 'Cómo pesar la comida',
    resumen:
      'En crudo o cocinado, qué merece la pena pesar y qué no, y cómo calcular con la mano cuando comes fuera de casa.',
    icono: '⚖️',
  },
] as const;

/** Enlaces del pie. */
export const NAV_LEGAL = [
  { href: '/sobre-nosotros', texto: 'Sobre nosotros' },
  { href: '/aviso-legal', texto: 'Aviso legal' },
  { href: '/privacidad', texto: 'Privacidad' },
  { href: '/cookies', texto: 'Cookies' },
] as const;
