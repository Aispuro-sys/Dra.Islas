export default function handler(req, res) {
  const { servicio, nombre, tel, msg } = req.query;

  const safeServicio = servicio || 'Consulta General';
  const safeNombre = nombre || 'No especificado';
  const safeTel = tel || 'No especificado';
  const safeMsg = msg || '';

  const title = `Ficha de Cita - ${safeNombre}`;
  const description = `Servicio: ${safeServicio} | Tel: ${safeTel}${safeMsg ? ` | Mensaje: ${safeMsg}` : ''}`;
  const siteUrl = 'https://dra-islas.vercel.app';
  const ogImage = `${siteUrl}/assets/banner-cita.jpg`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<link rel="icon" type="image/png" href="${siteUrl}/assets/logo-blanco-sin-fondo.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap" rel="stylesheet" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:url" content="${siteUrl}/api/cita" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${ogImage}" />
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    background:radial-gradient(ellipse at top, #F2F7FB 0%, #DCE8F2 100%);
    color:#1E3A52;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:24px 16px;
    font-family:'Inter',sans-serif;
  }
  .page-container{
    width:100%;
    max-width:860px;
    display:flex;
    flex-direction:column;
    gap:20px;
    align-items:center;
  }
  .top-badge{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:rgba(30,58,82,0.08);
    color:#1E3A52;
    padding:6px 18px;
    border-radius:40px;
    font-size:0.8rem;
    font-weight:600;
    letter-spacing:0.12em;
    text-transform:uppercase;
  }
  .banner-wrapper{
    position:relative;
    width:100%;
    aspect-ratio:1424 / 752;
    border-radius:20px;
    overflow:hidden;
    box-shadow:0 24px 64px -16px rgba(30,58,82,0.28), 0 2px 12px rgba(0,0,0,0.06);
    background:#fff;
  }
  .banner-img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    user-select:none;
    pointer-events:none;
  }
  .field-overlay{
    position:absolute;
    font-family:'Inter',sans-serif;
    font-weight:700;
    color:#1E3A52;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    line-height:1;
    pointer-events:none;
    text-shadow:0 1px 2px rgba(255,255,255,0.8);
  }
  .field-nombre{
    top:57.4%;
    left:53.6%;
    max-width:23.5%;
    font-size:clamp(0.68rem, 1.9vw, 1.22rem);
    color:#1A365D;
    letter-spacing:-0.01em;
  }
  .field-tel{
    top:63.6%;
    left:53.6%;
    max-width:23.5%;
    font-size:clamp(0.68rem, 1.9vw, 1.22rem);
    color:#1A365D;
    letter-spacing:0.02em;
  }
  .field-tratamiento{
    top:69.8%;
    left:38.8%;
    max-width:34.5%;
    font-size:clamp(0.68rem, 1.9vw, 1.22rem);
    color:#1A365D;
  }
  .clickable-wa-overlay{
    position:absolute;
    bottom:6.5%;
    left:33%;
    width:34%;
    height:12%;
    border-radius:40px;
    cursor:pointer;
    transition:transform 0.2s ease, box-shadow 0.2s ease;
  }
  .clickable-wa-overlay:hover{
    background:rgba(37,211,102,0.12);
  }
  .extra-card{
    background:#ffffff;
    width:100%;
    border-radius:16px;
    padding:20px 24px;
    box-shadow:0 8px 30px -8px rgba(30,58,82,0.12);
    display:flex;
    flex-direction:column;
    gap:14px;
  }
  .extra-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:12px;
    border-bottom:1px solid #E2EBF2;
    font-size:0.92rem;
  }
  .extra-row:last-child{
    border-bottom:none;
    padding-bottom:0;
  }
  .extra-label{
    color:#7A95AD;
    font-size:0.8rem;
    text-transform:uppercase;
    letter-spacing:0.08em;
    font-weight:600;
  }
  .extra-val{
    color:#1E3A52;
    font-weight:600;
  }
  .actions{
    display:flex;
    gap:12px;
    width:100%;
    justify-content:center;
    flex-wrap:wrap;
  }
  .btn{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:13px 28px;
    border-radius:40px;
    text-decoration:none;
    font-weight:600;
    font-size:0.92rem;
    transition:all 0.25s ease;
  }
  .btn-wa{
    background:#25D366;
    color:#ffffff;
    box-shadow:0 6px 18px -4px rgba(37,211,102,0.45);
  }
  .btn-wa:hover{
    background:#1EBE5D;
    transform:translateY(-2px);
  }
  .btn-web{
    background:#1E3A52;
    color:#ffffff;
  }
  .btn-web:hover{
    background:#142738;
    transform:translateY(-2px);
  }
</style>
</head>
<body>
  <div class="page-container">
    <div class="top-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      Ficha Digital de Cita
    </div>

    <div class="banner-wrapper">
      <img src="${ogImage}" alt="Banner Cita" class="banner-img" />
      <div class="field-overlay field-nombre">${safeNombre}</div>
      <div class="field-overlay field-tel">${safeTel}</div>
      <div class="field-overlay field-tratamiento">${safeServicio}</div>
      <a href="https://wa.me/526645234335" class="clickable-wa-overlay" title="Confirmar vÃ­a WhatsApp"></a>
    </div>

    ${safeMsg ? `
    <div class="extra-card">
      <div class="extra-row">
        <span class="extra-label">Mensaje o Nota del Paciente</span>
      </div>
      <div class="extra-val" style="font-weight:400;color:#334E68;line-height:1.5;">${safeMsg}</div>
    </div>
    ` : ''}

    <div class="actions">
      <a href="https://wa.me/526645234335" class="btn btn-wa">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Confirmar en WhatsApp
      </a>
      <a href="${siteUrl}" class="btn btn-web">
        Ver Sitio Web
      </a>
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
