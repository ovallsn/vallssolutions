# Diseño: información legal y refuerzo de seguridad de Valls Solutions

Fecha: 8 de octubre de 2026

Estado: pendiente de revisión del propietario

Proyecto: `vallssolutions`

## Objetivo

Publicar información legal clara en inglés y español, describir con precisión los datos que procesa la web y cerrar los avisos de seguridad observados en el informe ZAP. La web es una web informativa estática; el alcance no añade cuentas, formularios, pagos ni un backend.

## Opciones consideradas

1. **Documentar la configuración actual y añadir consentimiento solo si hace falta.** Publicar las políticas bilingües, comprobar la configuración real de cookies y proteger la respuesta de Cloudflare. Es la recomendación porque el código no contiene formularios ni trackers de marketing y la respuesta normal de la portada no envió `Set-Cookie`.
2. **Instalar ya un gestor de consentimiento.** Añade banner, persistencia de preferencias y lógica para bloquear scripts. Hoy no hay categorías de seguimiento no esencial verificadas; el gestor añadiría almacenamiento y complejidad sin una finalidad actual.
3. **Publicar únicamente las políticas.** No cubriría los hallazgos de cabeceras del informe ZAP.

Se adopta la opción 1, que el propietario ha autorizado en la conversación. Si se incorpora analítica, publicidad, vídeo embebido u otra tecnología no esencial, se vuelve a auditar y se implementa consentimiento previo antes de cargarla.

## Evidencia actual

- El sitio usa Next.js App Router con exportación estática, despliegue en GitHub Pages y Cloudflare como proxy. Inglés usa rutas sin prefijo; español usa `/es/`.
- El código contiene enlaces `mailto:` para consultas, no formularios, cuenta de usuario, pago ni almacenamiento de datos de clientes.
- La portada publicada devuelve 200 y, en una petición normal, no envía `Set-Cookie`. Se observan recursos de Next.js, el descifrado de direcciones de correo de Cloudflare y el beacon de Cloudflare Web Analytics/RUM.
- Cloudflare documenta que su beacon RUM no escribe ni lee cookies, `localStorage`, `sessionStorage` o IndexedDB; la documentación indica además que el tráfico del EEE/UE se excluye por defecto en su plan gratuito. No tenemos acceso a la configuración de la zona para confirmar el plan ni los controles aplicados a esta cuenta.
- En la respuesta publicada faltan `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options` y `X-Frame-Options`. Cloudflare sirve la respuesta y admite reglas de modificación de cabeceras.
- El repositorio usa el nombre `Valls Solutions LLC` y el correo `info@vallssolutions.com`. No se encontró domicilio legal, identificador registral público ni condiciones completas de pago, cancelación o reembolso.
- El sitio ofrece $699 por la formación inicial y $449/año desde el segundo año. El README confirma el alcance principal, pero exige comprobar estos datos con las condiciones vigentes del proveedor antes de modificar el texto comercial.

## Referencia de contenido

Se han consultado las páginas de [cookies](https://devil.club/legal/cookies/) y [privacidad](https://devil.club/legal/privacidad/) de Devil Club. Son útiles como lista de temas: identidad, inventario comprobable de cookies, proveedores, finalidades, conservación, derechos y gestión de preferencias. Su web sí describe cuentas, analítica, marketing y otros servicios que no aparecen en el código de Valls Solutions. No se copiarán sus textos, dirección, cookies, proveedores ni bases jurídicas.

Referencias normativas y técnicas: [artículos 3 y 13 del RGPD](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679), [artículos 2, 10 y 22.2 de la LSSI-CE](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758), [Guía de cookies de la AEPD](https://www.aepd.es/guias/guia-cookies.pdf), [RUM Beacon de Cloudflare](https://developers.cloudflare.com/speed/observatory/rum-beacon/) y [reglas de cabeceras de respuesta de Cloudflare](https://developers.cloudflare.com/rules/transform/response-header-modification/).

## Diseño propuesto

### Páginas y navegación

Añadir páginas canónicas con el patrón bilingüe existente:

| Inglés | Español |
| --- | --- |
| `/legal-notice/` | `/es/aviso-legal/` |
| `/privacy/` | `/es/privacidad/` |
| `/cookies/` | `/es/cookies/` |
| `/terms/` | `/es/terminos/` |

Incluir enlaces a estas cuatro páginas en el pie de página de ambos idiomas, y añadir rutas, metadatos, alternates `hreflang` y entradas canónicas al sitemap usando los patrones de `src/lib/routes.ts`. Mantener diseño de lectura sobrio, semántico y responsive, con enlaces visibles al contacto y entre páginas relacionadas.

### Contenido legal

- **Aviso legal:** entidad responsable, domicilio de contacto legal, país/jurisdicción de constitución, correo, titularidad del sitio y datos exigibles según el lugar de establecimiento. No inferir el domicilio de un agente registrado ni copiar la dirección de Devil Club.
- **Privacidad:** responsable y contacto; datos de navegación y seguridad; consultas iniciadas por email; finalidades y bases jurídicas verificadas; proveedores (hosting/CDN/analítica si procede); transferencias internacionales y salvaguardas verificadas; criterios de conservación; derechos y canal para ejercerlos; autoridad de control si corresponde; ausencia de decisiones automatizadas y de recogida de documentos de identidad en esta web.
- **Cookies:** inventario obtenido en navegador limpio, con categorías, proveedor, propósito, duración y estado de consentimiento. Describir por separado el RUM de Cloudflare si la zona lo mantiene habilitado y aclarar el tratamiento técnico que documente Cloudflare. No afirmar que no existen cookies en todos los casos si las reglas anti-bot de Cloudflare pueden activarlas en ciertos visitantes.
- **Términos:** explicar alcance confirmado de formación y renovación, límites del apoyo bancario, entrega de web/archivos si no se renueva, obligaciones del cliente y dependencia de terceros. Incluir pago, impuestos, duración, renovación, cancelación, reembolso, inicio del servicio y resolución de disputas solo después de que el propietario confirme las condiciones vigentes. No prometer resultados fiscales, bancarios, migratorios ni legales.

El RGPD puede aplicarse a una LLC fuera de la UE si ofrece servicios a personas situadas en la Unión o monitoriza su comportamiento allí. La aplicación de LSSI-CE depende, entre otros factores, de dónde se dirige y gestiona realmente la empresa. La web está dirigida a fundadores internacionales, así que el texto final y la cuestión de representante en la UE deben revisarse con asesoría legal; no se presentará esta implementación como certificación de cumplimiento.

### Cookies y consentimiento

No mostrar un banner de consentimiento solo para las métricas RUM documentadas como carentes de almacenamiento de navegador. Antes de publicar la política, inspeccionar cookies y almacenamiento en una sesión nueva, navegar por las rutas principales y revisar el comportamiento de Cloudflare bajo una visita normal y, si se produce, una verificación anti-bot. Si se confirma una cookie estrictamente necesaria, describirla con evidencia. Si se encuentra una tecnología no esencial, bloquearla hasta el consentimiento y ofrecer aceptar y rechazar al mismo tiempo, con igual nivel y visibilidad, además de una forma permanente y sencilla de cambiar la decisión.

### Seguridad web

- Crear una regla de cabeceras de respuesta de Cloudflare limitada al host `vallssolutions.com` (incluyendo o separando `www` solo después de verificar su canonicalización): `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` y una `Permissions-Policy` que desactive cámara, micrófono y geolocalización, salvo que se encuentre una función que las requiera.
- Añadir HSTS tras verificar HTTPS y el comportamiento de todos los subdominios relevantes; empezar sin `includeSubDomains` ni `preload` hasta confirmar que son seguros.
- Probar `Content-Security-Policy-Report-Only` con los scripts, estilos y conexiones reales. Aplicar una CSP de bloqueo únicamente después de revisar la consola y evitar romper la hidratación de Next.js, el beacon de Cloudflare o funciones actuales.
- Revisar el aviso CORS del informe antes de cambiar nada. No añadir `Access-Control-Allow-Origin: *` ni ampliar permisos sin probar que la respuesta de `vallssolutions.com` es responsable del hallazgo.
- Repetir ZAP con alcance limitado al dominio propio y el análisis pasivo primero. No ejecutar ataques activos sobre producción sin confirmar antes el alcance y la ventana.
- Strix no está disponible con los prerrequisitos locales actuales; no activar Docker, WSL ni el hipervisor. La revisión local será manual y el informe ZAP se tratará como evidencia complementaria.

## Criterios de aceptación

1. Las ocho rutas legales renderizan en el idioma correcto, con enlaces recíprocos, metadatos únicos, canonical, `hreflang`, sitemap y navegación del pie.
2. Los textos describen solo tratamientos y condiciones confirmados. No contienen datos de Devil Club ni campos legales inventados.
3. La decisión sobre banner se apoya en una comprobación de cookies y almacenamiento, no en la presencia de una política genérica.
4. Las cabeceras se validan en respuestas HTTPS públicas; la CSP se hace cumplir solo tras una fase de observación sin violaciones funcionales.
5. El informe ZAP se filtra a `vallssolutions.com`, y cada hallazgo que se corrija vuelve a comprobarse.
6. Las páginas son legibles con teclado y en móvil, y la exportación estática y auditoría local de rutas pasan.

## Datos pendientes del propietario antes de publicar

1. Domicilio postal legal actual y país; confirmar si `Valls Solutions LLC` es la denominación registral completa. No compartir un EIN ni documentos de identidad en este chat.
2. Confirmar si los servicios se ofrecen activamente a residentes de la UE/Reino Unido y dónde se dirige y gestiona la empresa para revisar el alcance legal.
3. Confirmar condiciones vigentes de cobro, impuestos, renovaciones, cancelaciones, reembolsos y entrega/plazos del servicio.
4. Confirmar la zona y plan de Cloudflare, si RUM está activado para UE/EEE, y si se usan reglas de Bot Fight Mode/Turnstile u otras que puedan establecer cookies.

Las páginas pueden prepararse como borradores con los hechos confirmados, pero no se publicarán como políticas finales mientras los puntos 1 y 3 sigan sin confirmar. La aplicación de reglas de cabeceras en Cloudflare requiere acceso autenticado al panel/API; el repositorio por sí solo no modifica la configuración de la cuenta.
