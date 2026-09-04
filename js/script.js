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
      let texto = "*Solicitud de Cita - Dra. Tamara Islas*%0A%0A";
      texto += "*Servicio:* " + encodeURIComponent(servicio) + "%0A";
      texto += "%0AHola, me gustaria agendar una cita para " + encodeURIComponent(servicio) + ". ¿Que horarios tienen disponibles?";
      window.open("https://wa.me/526645234335?text=" + texto, "_blank");
    });
  });

  // Reservation form -> WhatsApp
  function enviarReserva(event) {
    event.preventDefault();
    const nombre = document.getElementById('r-nombre').value.trim();
    const tel = document.getElementById('r-tel').value.trim();
    const servicio = document.getElementById('r-servicio').value;
    const fecha = document.getElementById('r-fecha').value;
    const msg = document.getElementById('r-msg').value.trim();

    let texto = "*Solicitud de Reservacion - Dra. Tamara Islas*%0A%0A";
    texto += "*Nombre:* " + encodeURIComponent(nombre) + "%0A";
    texto += "*Telefono:* " + encodeURIComponent(tel) + "%0A";
    texto += "*Servicio:* " + encodeURIComponent(servicio) + "%0A";
    if (fecha) texto += "*Fecha preferida:* " + encodeURIComponent(fecha) + "%0A";
    if (msg) texto += "*Mensaje:* " + encodeURIComponent(msg);

    window.open("https://wa.me/526645234335?text=" + texto, "_blank");
    return false;
  }
