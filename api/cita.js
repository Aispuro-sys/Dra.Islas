export default function handler(req, res) {
  const { servicio, nombre, tel, msg } = req.query;

  const safeServicio = servicio || 'Consulta General';
  const safeNombre = nombre || 'No especificado';
  const safeTel = tel || 'No especificado';
  const safeMsg = msg || '';

  const title = `Nueva Solicitud de Cita - ${safeNombre}`;
  const description = `Servicio: ${safeServicio} | Tel: ${safeTel}${safeMsg ? ` | Msg: ${safeMsg}` : ''}`;
  const siteUrl = 'https://dra-islas.vercel.app';
  const ogImage = `${siteUrl}/assets/banner-cita.jpg`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<meta property="og:title" content="🦷 ${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:url" content="${siteUrl}/api/cita" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="🦷 ${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${ogImage}" />
<style>
  *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',system-ui,sans-serif}
  body{background:#EEF4F8;color:#1E3A52;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
  .card{background:#fff;border-radius:16px;box-shadow:0 20px 60px -20px rgba(30,58,82,.25);max-width:480px;width:100%;overflow:hidden}
  .card-header{background:linear-gradient(135deg,#5A8AA8,#1E3A52);padding:32px 28px;text-align:center}
  .card-header h1{color:#fff;font-size:1.4rem;font-weight:600}
  .card-header p{color:rgba(255,255,255,.7);font-size:.8rem;margin-top:6px;letter-spacing:.1em;text-transform:uppercase}
  .card-body{padding:28px}
  .row{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid #D9E5EE}
  .row:last-child{border-bottom:none}
  .row .ic{width:36px;height:36px;border-radius:50%;background:#EEF4F8;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  .row .label{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:#7A95AD;font-weight:600}
  .row .value{font-size:1rem;color:#1E3A52;font-weight:500;margin-top:2px}
  .footer{text-align:center;padding:20px 28px 28px}
  .footer a{display:inline-block;background:#25D366;color:#fff;padding:12px 28px;border-radius:40px;text-decoration:none;font-weight:600;font-size:.9rem}
  .footer a:hover{background:#1da851}
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <h1>🦷 Solicitud de Cita</h1>
      <p>Clinica Dental CUES · Dra. Tamara Islas</p>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="ic">👤</div>
        <div><div class="label">Paciente</div><div class="value">${safeNombre}</div></div>
      </div>
      <div class="row">
        <div class="ic">🦷</div>
        <div><div class="label">Servicio</div><div class="value">${safeServicio}</div></div>
      </div>
      <div class="row">
        <div class="ic">📱</div>
        <div><div class="label">Telefono</div><div class="value">${safeTel}</div></div>
      </div>
      ${safeMsg ? `<div class="row"><div class="ic">💬</div><div><div class="label">Mensaje</div><div class="value">${safeMsg}</div></div></div>` : ''}
    </div>
    <div class="footer">
      <a href="https://wa.me/526645234335">Confirmar por WhatsApp</a>
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
