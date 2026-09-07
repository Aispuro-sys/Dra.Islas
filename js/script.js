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
        if (select.options[i].text.toLowerCase().includes(servicio.toLowerCase())) {
          select.selectedIndex = i;
          break;
        }
      }
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (nombreInput) nombreInput.focus();
      }, 600);
    }
  });
});

// Reservation form -> WhatsApp
function enviarReserva(event) {
  event.preventDefault();
  const nombre = document.getElementById('r-nombre').value.trim();
  const tel = document.getElementById('r-tel').value.trim();
  const servicio = document.getElementById('r-servicio').value;
  const msg = document.getElementById('r-msg').value.trim();

  const params = new URLSearchParams();
  if (nombre) params.set('nombre', nombre);
  if (tel) params.set('tel', tel);
  if (servicio) params.set('servicio', servicio);
  if (msg) params.set('msg', msg);

  const citaUrl = "https://dra-islas.vercel.app/api/cita?" + params.toString();

  // URL-encoded strings with hex escape codes for emojis: ðŸ¦· %F0%9F%A6%B7 | ðŸ‘¤ %F0%9F%91%A4 | ðŸ“± %F0%9F%93%B1 | ðŸ’¬ %F0%9F%92%AC
  let texto = "%F0%9F%A6%B7 *Nueva solicitud de cita*%0A";
  texto += "Clinica Dental CUES - Dra. Tamara Islas%0A%0A";
  texto += "%F0%9F%91%A4 *Paciente:* " + encodeURIComponent(nombre) + "%0A";
  texto += "%F0%9F%93%B1 *Telefono:* " + encodeURIComponent(tel) + "%0A";
  texto += "%F0%9F%A6%B7 *Servicio:* " + encodeURIComponent(servicio) + "%0A";
  if (msg) texto += "%F0%9F%92%AC *Mensaje:* " + encodeURIComponent(msg) + "%0A";
  texto += "%0AFicha de la cita:%0A";
  texto += citaUrl;

  window.location.href = "https://wa.me/526645234335?text=" + texto;
  return false;
}
