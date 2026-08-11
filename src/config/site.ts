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
  { href: '/generador-dieta', texto: 'Tu dieta' },
  { href: '/metodo', texto: 'Método' },
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
  {
    href: '/guias/recomposicion-corporal',
    titulo: 'Recomposición corporal',
    resumen:
      'Perder grasa y ganar músculo a la vez: cuándo funciona de verdad, cómo estructurarlo y por qué la báscula no sirve para medirlo.',
    icono: '🔄',
  },
  {
    href: '/guias/volumen-limpio',
    titulo: 'Volumen limpio',
    resumen:
      'Cuántas calorías comer para ganar músculo sin acumular grasa, la diferencia real con el volumen sucio y cuándo hay que cortar.',
    icono: '📈',
  },
  {
    href: '/guias/cuantas-calorias-necesito-al-dia',
    titulo: 'Cuántas calorías necesito al día',
    resumen:
      'Tu cifra según peso, altura y actividad, con tabla por perfiles. La diferencia entre BMR y mantenimiento, y por qué ninguna fórmula acierta sin comprobarla.',
    icono: '🔢',
  },
  {
    href: '/guias/como-empezar-en-el-gimnasio',
    titulo: 'Cómo empezar en el gimnasio',
    resumen:
      'Expectativas realistas mes a mes, cómo comer desde el primer día y los cinco errores que hacen abandonar en tres semanas.',
    icono: '🏋️',
  },
  {
    href: '/guias/que-comer-antes-de-entrenar',
    titulo: 'Qué comer antes de entrenar',
    resumen:
      'Qué comer y cuánto tiempo antes según la hora de tu sesión, con ejemplos concretos, qué evitar y si merece la pena entrenar en ayunas.',
    icono: '🍽️',
  },
  {
    href: '/guias/suplementos-que-merecen-la-pena',
    titulo: 'Suplementos que merecen la pena',
    resumen:
      'Cuánta creatina tomar al día, cuánta proteína en polvo, cuánto omega 3 y si sirven los multivitamínicos. Con las dosis exactas y los mitos desmontados.',
    icono: '💊',
  },
  {
    href: '/guias/que-comer-despues-de-entrenar',
    titulo: 'Qué comer después de entrenar',
    resumen:
      'Proteína y carbohidratos, sin prisas: por qué la ventana anabólica de 30 minutos es un mito y cuánto margen tienes en realidad.',
    icono: '🥗',
  },
] as const;

/**
 * Enlaces del pie. "Contacto" bajó aquí al entrar el generador de dietas en el
 * menú: con siete elementos arriba, la barra se partía en tres líneas en móvil.
 * Sigue enlazado desde todas las páginas, que es lo que exige AdSense.
 */
export const NAV_LEGAL = [
  { href: '/sobre-nosotros', texto: 'Sobre nosotros' },
  { href: '/contacto', texto: 'Contacto' },
  { href: '/aviso-legal', texto: 'Aviso legal' },
  { href: '/privacidad', texto: 'Privacidad' },
  { href: '/cookies', texto: 'Cookies' },
] as const;
