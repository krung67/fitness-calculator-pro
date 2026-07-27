// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción. Astro lo usa para generar URLs absolutas
  // (canonical, Open Graph, sitemap). Sin esto, esas etiquetas salen mal.
  site: 'https://calculadora-fit.com',

  // Cada página en su propio archivo: /guias/tdee.html en vez de /guias/tdee/index.html.
  // Evita que la misma página sea accesible con y sin barra final, que es
  // contenido duplicado a ojos de Google.
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
