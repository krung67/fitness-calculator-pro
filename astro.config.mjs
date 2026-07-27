// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap({
      // Astro genera el sitemap con las rutas tal y como las construye
      // (/metodo.html). Hay que dejarlas como se sirven realmente, o le
      // estaríamos dando a Google una lista de URLs que no coinciden con
      // el canonical de cada página.
      serialize(item) {
        item.url = item.url.replace(/index\.html$/, '').replace(/\.html$/, '');
        return item;
      },
    }),
  ],

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
