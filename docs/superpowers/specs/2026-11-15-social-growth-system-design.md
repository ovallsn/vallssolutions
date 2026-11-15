# Sistema automático de difusión para VALLS Solutions

## Objetivo

Aumentar el conocimiento de VALLS Solutions y llevar visitas de fundadores interesados en una LLC estadounidense a `vallssolutions.com`, con el menor trabajo recurrente posible para el propietario. El sistema reutilizará las guías existentes en inglés y español, publicará desde perfiles oficiales de la empresa y medirá visitas y clics de contacto.

## Objetivos

- Convertir los artículos públicos del blog en publicaciones programadas para redes sociales.
- Mantener una cadencia constante sin redactar cada publicación desde cero.
- Priorizar durante el piloto a fundadores que estén valorando crear una LLC estadounidense, tanto dentro como fuera de EE. UU., en inglés y español. No priorizar países concretos durante los primeros 30 días porque la web y la petición no identifican un mercado geográfico preferente.
- Dirigir el tráfico a la página relevante y facilitar el contacto por correo o WhatsApp.
- Mantener la voz de empresa y los datos de oferta consistentes con la web.
- Usar publicidad de Reddit para llegar a usuarios interesados en LLC cuando exista un presupuesto aprobado.

## Fuera de alcance y límites

- No crear reseñas, comentarios ni testimonios en primera persona fingiendo ser clientes.
- No usar cuentas personales o varias cuentas para ocultar la relación de VALLS con una publicación.
- No automatizar comentarios promocionales en conversaciones o comunidades de terceros en Reddit.
- No afirmar que una LLC garantiza ahorro fiscal, una cuenta bancaria o un visado.
- No anunciar que el servicio es «el más barato» ni llamar «expertos» a sus responsables sin pruebas que respalden esas afirmaciones.
- No activar gasto publicitario sin un límite autorizado.

## Enfoques considerados

1. **Bot que encuentra conversaciones y publica respuestas promocionales:** descartado. Reddit considera spam los bots que promocionan continuamente productos o servicios en comunidades, incluso si la promoción es el propósito del bot.
2. **Construir un gestor social dentro de Valls Control Panel:** posible, pero no es el primer paso adecuado. El panel es una aplicación privada para operaciones y no tiene gestión de publicaciones. Integrar cada red implicaría permisos, tokens y mantenimiento de varias API.
3. **Metricool con feeds RSS bilingües, listas automáticas y anuncios identificados en Reddit (elegido):** requiere poco mantenimiento, aprovecha el blog existente, puede publicar automáticamente desde perfiles de empresa y ofrece estadísticas. La integración oficial de Metricool con ChatGPT también permite consultar resultados y programar contenido desde la conversación una vez conectada la cuenta.

## Decisiones de implementación

- Mantener la web bilingüe actual, Next.js con exportación estática y el panel de control separados. La web será la fuente pública de contenido; Metricool será el programador de redes.
- Añadir dos feeds RSS estáticos generados durante la compilación: `/blog/rss.xml` en inglés y `/es/blog/rss.xml` en español. Cada elemento contendrá únicamente un artículo publicado, su título y resumen localizados, su URL canónica y su imagen social. No se incluirán datos privados ni borradores.
- Crear una tarjeta social original por artículo e idioma usando el sistema visual existente de VALLS. Ahora todos los artículos comparten la misma imagen social por idioma; las tarjetas específicas harán que los enlaces del feed no parezcan copias idénticas. No se incorporarán imágenes de terceros ni dependencias nuevas.
- Crear una lista automática en Metricool por idioma. La tanda inicial reutilizará artículos públicos del catálogo y cada lista compartirá automáticamente los artículos nuevos del RSS. Metricool publicará la cola directamente, sin una aprobación para cada post. La cadencia inicial será de dos publicaciones por semana por perfil, alternando idiomas, con separación suficiente entre repeticiones.
- Priorizar la página de empresa de LinkedIn para publicaciones con enlaces y el perfil profesional de Instagram para piezas visuales. Añadir la página de Facebook si VALLS ya la usa. La misma idea podrá adaptarse por red; no se publicará en perfiles ajenos ni con identidad personal ficticia.
- Usar los artículos actuales como contenido inicial. Cada publicación tendrá una introducción breve en el tono de VALLS, una tarjeta específica y un enlace a su guía o a la página de servicio pertinente. Los textos iniciales se prepararán a partir de artículos publicados; la lista automática no generará consejos libres. Si una guía cambia, la versión publicada en la web seguirá siendo la fuente autorizada.
- Mantener un registro cerrado de datos aprobados para las publicaciones: más de 100 LLC constituidas; paquete de Wyoming por $699, incluida la tasa estatal y los elementos descritos en la web; renovación de $449/año desde el segundo año con el alcance publicado. Cualquier importe o alcance se tomará de la web actualizada.
- La generación automática se limitará a títulos, resúmenes y mensajes informativos basados en esos artículos y datos. Si una afirmación no puede vincularse a una fuente aprobada, se omite.
- En Reddit, usar campañas de anuncios de VALLS con segmentación por comunidades/temas o palabras clave y la segmentación automática de Reddit cuando esté disponible. Los anuncios mostrarán que son de VALLS. No se responderá automáticamente en hilos orgánicos. La campaña permanecerá detenida hasta que se conecte la cuenta publicitaria y se defina un límite de gasto.
- Como fase opcional, configurar respuestas FAQ en el perfil propio de Instagram para preguntas entrantes sobre precio, alcance y contacto. Las respuestas serán plantillas aprobadas que enlazan a la web; no ofrecerán consejo fiscal, legal, migratorio ni prometerán aprobaciones bancarias. Metricool indica que esta automatización requiere su complemento Flows de pago, por lo que no se activa sin confirmar ese coste.
- Etiquetar enlaces con parámetros de campaña y mantener el consentimiento de analítica que ya utiliza la web. No añadir píxeles de publicidad en la primera fase.
- Medir publicaciones, impresiones, clics, sesiones que llegan a páginas de formación, precio o contacto y clics en los enlaces de contacto. Después de 30 días, ajustar la cadencia y conservar los temas y canales que atraigan ese tráfico.

## Dependencias y limitaciones

- El código de la web no muestra ahora enlaces a perfiles sociales oficiales; esto no confirma si las cuentas existen. Para activar el sistema se tendrán que conectar únicamente los perfiles oficiales disponibles.
- La conexión Metricool con ChatGPT está disponible para sugerir y programar contenido, pero aún no está conectada. El conector no se considera activo hasta que el propietario termine esa conexión.
- Las funciones de publicación automática dependen de que cada perfil cumpla los requisitos de la red y de Metricool.
- Los anuncios de Reddit requieren una cuenta publicitaria y un presupuesto. Su rendimiento no garantiza ventas.
- Las páginas de artículos usan ahora una imagen social genérica por idioma. Si los previsualizadores de RSS resultan repetitivos, crear tarjetas locales por artículo será una mejora acotada antes de ampliar la campaña.
- La web ya carga analítica solo con consentimiento y registra visitas, enlaces salientes, descargas y envíos de formularios.
- El formulario actual prepara un email o un WhatsApp y no almacena consultas ni confirma que se hayan enviado. Por eso el informe automático de la primera fase medirá tráfico y clics de contacto; no afirmará cuántas ventas o consultas cualificadas llegaron desde cada canal.

## Criterios de éxito

- Los feeds inglés y español validan como RSS y enumeran solo rutas canónicas publicadas.
- Metricool recibe los feeds y la lista automática programa contenido sin que el propietario tenga que crear cada publicación.
- Las publicaciones muestran claramente a VALLS Solutions como empresa.
- Ninguna publicación presenta una experiencia ficticia ni afirma resultados garantizados.
- Reddit se utiliza mediante anuncios identificados o participación permitida, nunca mediante comentarios promocionales automáticos en comunidades.
- Los enlaces permiten identificar el canal y el idioma, y al cabo de 30 días existe un resumen de alcance, tráfico a páginas comerciales y clics de contacto por canal.

## Fuentes oficiales consultadas

- Reddit, política de spam: https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam
- Reddit Ads, segmentación automática: https://business.reddithelp.com/articles/Knowledge/automated-targeting
- FTC, reseñas y testimonios falsos: https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
- Metricool, RSS a lista automática: https://help.metricool.com/how-to-link-an-rss-feed-to-an-autolist-ank6m
- Metricool, contenido programado por RSS: https://help.metricool.com/schedule-content-from-an-autolist-fxehk
- Metricool, conector de ChatGPT y programación: https://metricool.com/metricool-launches-official-connectors-for-claude-and-chatgpt/
- Metricool, límites de respuestas automáticas: https://help.metricool.com/what-are-flows-nfody
