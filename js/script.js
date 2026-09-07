  // Mobile menu
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Service card reserve buttons -> WhatsApp
  document.querySelectorAll('.svc-reserve').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const servicio = btn.getAttribute('data-servicio');
      const citaUrl = "https://dra-islas.vercel.app/api/cita?servicio=" + encodeURIComponent(servicio);
      let texto = "";
      texto += "Ã°Å¸Â¦Â· *Nueva solicitud de cita*%0A";
      texto += "Clinica Dental CUES - Dra. Tamara Islas%0A%0A";
      texto += "Ã°Å¸â€œâ€¹ *Servicio:* " + encodeURIComponent(servicio) + "%0A%0A";
      texto += "Hola, me gustaria agendar una cita para *" + encodeURIComponent(servicio) + "*.%0A";
      texto += "Ã‚Â¿Que horarios tienen disponibles? Ã°Å¸â€œâ€¦%0A%0A";
      texto += "Ver detalles de la solicitud:%0A";
      texto += citaUrl;
      window.location.href = "https://wa.me/526645234335?text=" + texto;
    });
  });

  // Reservation form -> WhatsApp
  function enviarReserva(event) {
    event.preventDefault();
    const nombre = document.getElementById('r-nombre').value.trim();
    const tel = document.getElementById('r-tel').value.trim();
    const servicio = document.getElementById('r-servicio').value;
    const msg = document.getElementById('r-msg').value.trim();

    const params = new URLSearchParams({
      servicio: servicio,
      nombre: nombre,
      tel: tel
    });
    if (msg) params.append('msg', msg);
    const citaUrl = "https://dra-islas.vercel.app/api/cita?" + params.toString();

    let texto = "";
    texto += "Ã°Å¸Â¦Â· *Nueva solicitud de cita*%0A";
    texto += "Clinica Dental CUES - Dra. Tamara Islas%0A%0A";
    texto += "Ã°Å¸â€˜Â¤ *Paciente:* " + encodeURIComponent(nombre) + "%0A";
    texto += "Ã°Å¸â€œÂ± *Telefono:* " + encodeURIComponent(tel) + "%0A";
    texto += "Ã°Å¸Â¦Â· *Servicio:* " + encodeURIComponent(servicio) + "%0A";
    if (msg) texto += "Ã°Å¸â€™Â¬ *Mensaje:* " + encodeURIComponent(msg) + "%0A";
    texto += "%0AFicha de la cita:%0A";
    texto += citaUrl;
    window.location.href = "https://wa.me/526645234335?text=" + texto;
    return false;
  }
