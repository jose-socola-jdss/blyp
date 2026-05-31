# Contexto del proyecto Blyp

## Objetivo
Crear un sitio web responsive para **Blyp**, una marca que desarrolla páginas web con inteligencia artificial.

## Páginas implementadas
- `index.html`: página de inicio basada en `references/reference_inicio.html`.
- `portfolio.html`: página de portafolio basada en `references/reference_portafolio.html`.
- `contact.html`: página de contacto basada en `references/reference_contacto.html`.

## Decisiones clave
- Se unificó la navegación interna usando `contact.html` como nombre final para la página de contacto.
- Se creó `assets/site.css` para concentrar estilos compartidos: glassmorphism, masonry, sombras suaves y utilidades globales.
- Se creó `assets/site.js` para manejar el menú móvil y actualizar el año del footer automáticamente.
- Se mantuvo la dirección visual del documento `markdowns/DESIGN.md`: paleta suave azul/gris, jerarquía editorial, superficies por capas y sensación premium.
- Se descargaron localmente las fuentes, imágenes principales y el script usado por Tailwind CDN para reducir dependencias remotas críticas.

## Ajustes recientes
- Se mejoró la accesibilidad del portafolio para que los overlays también funcionen con teclado (`focus-within` y `focus-visible`).
- Se mejoró el menú móvil: ahora puede cerrarse con `Escape`, al hacer clic fuera y mueve el foco al abrirse.
- Se añadió `aria-controls` a los botones del menú móvil y se ajustó el comportamiento ARIA básico.
- Se actualizó la carga de `Be Vietnam Pro` para incluir el peso `900`, de modo que `font-black` use un peso real.
- Se reemplazó el texto del header y footer por `blyp_logotipo.svg`.
- Se añadió `blyp_favicon.svg` como favicon en las tres páginas.
- Se corrigieron diferencias visuales del botón principal `Escríbenos` para que use el mismo estilo en todas las páginas y versiones.

## Ajustes de contenido
- Se corrigieron textos en español para mejorar ortografía, tildación y redacción.
- Se reemplazaron copys poco naturales por versiones más claras y profesionales.
- Se conectaron los enlaces del menú y CTA entre las tres páginas.

## Responsive
- Se añadió navegación móvil desplegable.
- Se ajustaron espaciados, tipografías y bloques para móviles y pantallas grandes.
- El portafolio usa una rejilla tipo masonry que cambia entre 1, 2 y 4 columnas según el ancho de pantalla.
- El portafolio quedó con 20 tarjetas verticales, con alturas variadas para una estética tipo Pinterest.

## Archivos creados
- `index.html`
- `portfolio.html`
- `contact.html`
- `assets/site.css`
- `assets/site.js`
- `assets/fonts/`
- `assets/images/`
- `assets/vendor/tailwindcdn.js`
- `markdowns/context.md`

## Pendientes sugeridos
- Revisar el sitio en navegador real para validar detalles finos de espaciado y tipografía.
- Sustituir las imágenes temporales del portafolio por capturas reales de las webs del cliente.
- Reemplazar los enlaces `Ver sitio web` del portafolio cuando el cliente comparta las URLs reales.
- Si se publica el sitio, evaluar una migración futura desde `assets/vendor/tailwindcdn.js` hacia un CSS compilado localmente.
