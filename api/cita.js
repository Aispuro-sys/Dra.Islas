export default function handler(req, res) {
  const q = req.query || {};

  const safeNombre = q.nombre || q.paciente || q.name || '';
  const safeTel = q.tel || q.telefono || q.phone || '';
  let rawServicio = q.servicio || q.tratamiento || q.treatment || '';

  // Format known services with standard HTML entities for 100% clean rendering
  let safeServicio = rawServicio;
  if (/odontopediatria/i.test(rawServicio)) {
    safeServicio = 'Odontopediatr&iacute;a';
  } else if (/protesis\s*fija/i.test(rawServicio)) {
    safeServicio = 'Pr&oacute;tesis Fija';
  } else if (/protesis\s*removible/i.test(rawServicio)) {
    safeServicio = 'Pr&oacute;tesis Removibles';
  } else if (/limpieza|periodoncia/i.test(rawServicio)) {
    safeServicio = 'Limpieza Profunda &amp; Periodoncia';
  } else if (/endodoncia/i.test(rawServicio)) {
    safeServicio = 'Endodoncia Conservadora';
  } else if (!safeServicio) {
    safeServicio = 'Consulta General';
  }

  const safeMsg = q.msg || q.mensaje || q.message || '';

  const cleanServicioText = safeServicio.replace(/&oacute;/g, 'o').replace(/&iacute;/g, 'i').replace(/&amp;/g, '&');
  const title = safeNombre ? `Ficha de Cita - ${safeNombre}` : `Ficha de Cita - ${cleanServicioText}`;
  const description = `Servicio: ${cleanServicioText}${safeTel ? ` | Tel: ${safeTel}` : ''}`;
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
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

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
    gap:16px;
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
    color:#1A365D;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    line-height:1;
    pointer-events:none;
  }
  .field-nombre{
    top:57.4%;
    left:53.6%;
    max-width:24%;
    font-size:clamp(0.68rem, 1.9vw, 1.22rem);
    letter-spacing:-0.01em;
  }
  .field-tel{
    top:63.6%;
    left:53.6%;
    max-width:24%;
    font-size:clamp(0.68rem, 1.9vw, 1.22rem);
    letter-spacing:0.02em;
  }
  .field-tratamiento{
    top:69.8%;
    left:38.8%;
    max-width:35%;
    font-size:clamp(0.68rem, 1.9vw, 1.22rem);
  }
  .extra-card{
    background:#ffffff;
    width:100%;
    border-radius:16px;
    padding:16px 20px;
    box-shadow:0 8px 30px -8px rgba(30,58,82,0.12);
    display:flex;
    flex-direction:column;
    gap:8px;
  }
  .extra-label{
    color:#7A95AD;
    font-size:0.75rem;
    text-transform:uppercase;
    letter-spacing:0.08em;
    font-weight:600;
  }
  .extra-val{
    color:#1E3A52;
    font-size:0.92rem;
    line-height:1.4;
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
      ${safeNombre ? `<div class="field-overlay field-nombre">${safeNombre}</div>` : ''}
      ${safeTel ? `<div class="field-overlay field-tel">${safeTel}</div>` : ''}
      <div class="field-overlay field-tratamiento">${safeServicio}</div>
    </div>

    ${safeMsg ? `
    <div class="extra-card">
      <span class="extra-label">Mensaje o Nota</span>
      <div class="extra-val">${safeMsg}</div>
    </div>
    ` : ''}
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
