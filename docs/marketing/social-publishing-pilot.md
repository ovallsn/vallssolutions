# Piloto de publicación social automática

## Objetivo

Usar las guías públicas de VALLS Solutions para atraer visitas de personas que están valorando crear una LLC en Estados Unidos. Las publicaciones salen con la identidad oficial de la empresa y enlazan a la guía correspondiente.

El piloto no crea reseñas ni testimonios de clientes. En Reddit se usan anuncios identificados o participación auténtica permitida por cada comunidad; no se automatizan respuestas promocionales en hilos.

## Feeds disponibles

| Idioma | Feed RSS | Contenido |
| --- | --- | --- |
| Inglés | <https://vallssolutions.com/blog/rss.xml> | Solo artículos publicados en inglés del catálogo actual |
| Español | <https://vallssolutions.com/es/blog/rss.xml> | Solo artículos publicados en español del catálogo actual |

Cada artículo tiene una tarjeta social propia de 1200×630. Metricool toma la imagen `og:image` de la página del artículo al importar el enlace. Los enlaces de los feeds incluyen `utm_source=valls_social`, `utm_medium=organic_social`, `utm_campaign=llc_blog_pilot` y `utm_content=<idioma>-<slug>`; las etiquetas canónicas de la página y el `guid` del feed no incluyen esos parámetros.

## Configuración inicial en Metricool

1. Conecta únicamente perfiles oficiales existentes y autorizados de VALLS Solutions. Para Instagram, usa un perfil profesional de empresa o creador.
2. Crea una Autolista por idioma y pega el feed correspondiente. Comprueba que Metricool reconoce los artículos recientes.
3. Para sembrar la cola con las guías existentes, activa **Include previous posts**. Mantén desactivado **Add disabled posts** para que no haya una aprobación manual por publicación. Activa **Repeat** para reciclar las guías y deja espacio suficiente entre cada repetición.
4. Programa hasta dos publicaciones semanales en total por perfil, alternando inglés y español. Si conectas varias redes a la misma Autolista, esa cadencia se aplica a cada perfil conectado.
5. Usa textos de prefijo y sufijo que identifiquen a VALLS Solutions y describan el contenido como una guía. Prefijos iniciales: `A guide from VALLS Solutions:` y `Una guía de VALLS Solutions:`. Para Instagram, usa los sufijos `Read the full guide via the link in our profile.` y `Lee la guía completa desde el enlace de nuestro perfil.` No añadas afirmaciones de ahorro fiscal garantizado, aprobación bancaria, visado ni superlativos no acreditados.
6. Activa la publicación automática solo en los perfiles que admitan ese formato. Algunas funciones nativas pueden requerir una notificación y publicación manual por límites de la API de la red.

Metricool revisa el feed periódicamente. Al añadir y publicar una nueva guía en el catálogo del sitio, su artículo puede incorporarse a la Autolista automáticamente. No hace falta programar de nuevo las guías existentes una por una.

### Diferencias por red

- **LinkedIn y Facebook:** el feed comparte el enlace al artículo. La red genera la vista previa a partir de sus metadatos Open Graph.
- **Instagram:** Metricool puede adjuntar la imagen del artículo al post, pero el enlace de un pie de foto no sirve como enlace directo. Coloca `https://vallssolutions.com/blog/?utm_source=instagram&utm_medium=bio&utm_campaign=llc_blog_pilot` en el campo **Sitio web** del perfil y usa una llamada a visitar el enlace del perfil. Metricool especifica que el enlace debe estar en el campo del sitio web para que sea clicable; el archivo `/blog/` ofrece acceso a ambos idiomas mediante el selector del sitio.
- **Reddit:** no se añade a las Autolistas orgánicas. Si se activa una campaña de anuncios, usa la identidad de VALLS Solutions, segmentación por palabras clave o comunidades cuando esté disponible, y define primero un límite de gasto.

Metricool indica que, para feeds RSS, obtiene la imagen desde `og:image` del enlace de cada artículo; en la Autolista adjunta esas imágenes a Instagram y Pinterest, mientras que otras redes generan la vista previa al publicar. También permite incluir las publicaciones anteriores al conectar un feed y programar directamente la Autolista. Consulta su [guía de feeds RSS en Autolistas](https://help.metricool.com/how-to-link-an-rss-feed-to-an-autolist-ank6m), la [guía de programación de Autolistas](https://help.metricool.com/schedule-content-from-an-autolist-fxehk), los [requisitos para conectar Instagram](https://help.metricool.com/how-to-connect-instagram-to-metricool-sermi) y la [configuración de enlaces en la biografía](https://help.metricool.com/faqs-about-smartlinks-in-metricool-hue3f).

## Borrador de anuncio para Reddit

El siguiente texto puede utilizarse cuando exista una cuenta de Reddit Ads y se haya definido el gasto máximo:

**Inglés**

- Titular: `Starting a U.S. business from abroad?`
- Texto: `VALLS Solutions helps founders form a Wyoming LLC and manage ongoing state requirements. Review the package scope and current pricing before you decide.`
- Destino: `https://vallssolutions.com/pricing/?utm_source=reddit&utm_medium=paid_social&utm_campaign=llc_blog_pilot&utm_content=launch`

**Español**

- Titular: `¿Vas a crear una empresa en EE. UU. desde otro país?`
- Texto: `VALLS Solutions ayuda a emprendedores a constituir una LLC en Wyoming y gestionar obligaciones recurrentes. Consulta el alcance y el precio actual del paquete antes de decidir.`
- Destino: `https://vallssolutions.com/es/precios/?utm_source=reddit&utm_medium=paid_social&utm_campaign=llc_blog_pilot&utm_content=launch`

Los anuncios deben identificarse como publicidad de VALLS Solutions. La política de Reddit prohíbe el spam promocional en comunidades y la normativa de la FTC prohíbe reseñas o testimonios falsos. Revisa la [política de spam de Reddit](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam), la [segmentación automática de Reddit Ads](https://business.reddithelp.com/articles/Knowledge/automated-targeting) y la [regla de la FTC sobre reseñas falsas](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) antes de iniciar una campaña.

## Seguimiento y revisión a 30 días

- En Metricool, revisa alcance, impresiones, clics y publicaciones por red.
- En la analítica del sitio, filtra el piloto con `utm_campaign=llc_blog_pilot` y revisa las visitas a formación, precios y contacto, además de los clics a correo y WhatsApp.
- La misma campaña UTM se comparte entre redes para las publicaciones que vienen del RSS; usa los informes de Metricool para comparar perfiles. Las sesiones web no siempre permiten atribuir con fiabilidad la red si un navegador elimina el referente.
- El sitio solo mide visitas y clics de salida con el consentimiento de analítica correspondiente. Como el formulario prepara un email o mensaje de WhatsApp, este piloto no confirma cuántas consultas llegaron ni cuántas ventas se cerraron.
- A los 30 días, conserva los temas y perfiles que atraigan visitas relevantes y ajusta la frecuencia. Si una guía cambia de forma importante, pausa o actualiza la publicación repetida en Metricool para evitar que un texto antiguo vuelva a circular.

## Estado de activación

El sitio y los feeds se preparan en el proyecto web. La publicación automática requiere conectar una cuenta de Metricool y los perfiles oficiales existentes. Los anuncios de Reddit requieren además la cuenta publicitaria y un límite de gasto elegido por el propietario. El complemento de respuestas FAQ para Instagram queda desactivado hasta confirmar el coste de Flows.
