/* ═══════════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════════ */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu    = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
        document.body.style.overflow = '';
    });
});

/* ═══════════════════════════════════════════════
   HEADER — SCROLL EFFECT
═══════════════════════════════════════════════ */
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ═══════════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === '#' + id
                );
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

/* ═══════════════════════════════════════════════
   GALLERY TABS
═══════════════════════════════════════════════ */
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Aquí se puede agregar lógica para mostrar/ocultar contenido por tab
    });
});

/* ═══════════════════════════════════════════════
   CONTACT FORM — EmailJS
═══════════════════════════════════════════════ */
(function initContactForm() {

    // Verificar que la librería y el config estén cargados
    if (typeof emailjs === 'undefined' || typeof EMAILJS_CONFIG === 'undefined') {
        console.warn('EmailJS o EMAILJS_CONFIG no encontrados.');
        return;
    }

    emailjs.init(EMAILJS_CONFIG.publicKey);

    const form      = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnLabel  = submitBtn.textContent;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nombre  = document.getElementById('nombre').value.trim();
        const email   = document.getElementById('email').value.trim();
        const asunto  = document.getElementById('asunto').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !email || !asunto || !mensaje) {
            mostrarEstado('Por favor completa todos los campos.', 'error');
            return;
        }

        submitBtn.disabled    = true;
        submitBtn.textContent = 'Enviando...';

        const params = {
            user_name:  nombre,
            user_email: email,
            subject:    asunto,
            message:    mensaje,
        };

        try {
            // 1. Notificación a la cuenta del juego
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateToGame,
                params
            );

            // 2. Respuesta automática al usuario
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateToUser,
                params
            );

            mostrarEstado('¡Mensaje enviado! Revisa tu correo para la confirmación.', 'success');
            form.reset();

        } catch (err) {
            console.error('EmailJS error:', err);
            mostrarEstado('Ocurrió un error al enviar. Inténtalo de nuevo.', 'error');
        } finally {
            submitBtn.disabled    = false;
            submitBtn.textContent = btnLabel;
        }
    });

    function mostrarEstado(mensaje, tipo) {
        const prev = document.getElementById('form-status');
        if (prev) prev.remove();

        const el         = document.createElement('p');
        el.id            = 'form-status';
        el.textContent   = mensaje;
        el.dataset.tipo  = tipo;
        form.appendChild(el);

        setTimeout(() => el && el.remove(), 6000);
    }

})();
