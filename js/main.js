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
   CONTACT FORM (básico)
═══════════════════════════════════════════════ */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí va la lógica de envío
        console.log('Formulario enviado');
    });
}
