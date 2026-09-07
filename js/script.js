// Mobile menu
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Service card buttons: scroll to form and select service
document.querySelectorAll('.svc-reserve').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const servicio = btn.getAttribute('data-servicio') || '';
    const select = document.getElementById('r-servicio');
    const nombreInput = document.getElementById('r-nombre');
    const contactSection = document.getElementById('contacto');

    if (select && servicio) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase().includes(servicio.toLowerCase()) || 
            select.options[i].value.toLowerCase().includes(servicio.toLowerCase())) {
          select.selectedIndex = i;
          break;
        }
      }
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (nombreInput) nombreInput.focus();
      }, 500);
    }
  });
});

// Reservation form -> WhatsApp
function enviarReserva(event) {
  event.preventDefault();
  const nombre = document.getElementById('r-nombre').value.trim();
  const tel = document.getElementById('r-tel').value.trim();
  const servicio = document.getElementById('r-servicio').value || 'Consulta General';
  const msg = document.getElementById('r-msg').value.trim();

  const params = new URLSearchParams();
  if (nombre) params.set('nombre', nombre);
  if (tel) params.set('tel', tel);
  if (servicio) params.set('servicio', servicio);
  if (msg) params.set('msg', msg);

  const citaUrl = "https://dra-islas.vercel.app/api/cita?" + params.toString();

  // Full message formatted cleanly
  let msgLines = [];
  msgLines.push("ðŸ¦· *Nueva solicitud de cita*");
  msgLines.push("Clinica Dental CUES - Dra. Tamara Islas\n");
  msgLines.push("ðŸ‘¤ *Paciente:* " + nombre);
  msgLines.push("ðŸ“± *Telefono:* " + tel);
  msgLines.push("ðŸ¦· *Servicio:* " + servicio);
  if (msg) {
    msgLines.push("ðŸ’¬ *Mensaje:* " + msg);
  }
  msgLines.push("\nFicha de la cita:\n" + citaUrl);

  const fullText = msgLines.join("\n");
  window.location.href = "https://wa.me/526645234335?text=" + encodeURIComponent(fullText);
  return false;
}
