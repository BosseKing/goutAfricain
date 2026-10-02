/* =========================================================
   GoûtAfricain — script commun à toutes les pages
   (en-tête, pied de page, animations)
   ========================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- En-tête et pied de page partagés ---------- */
const NAV = [
    ['index.html', 'Accueil'],
    ['menu.html', 'Menu'],
    ['a_propos.html', 'À propos'],
    ['contact.html', 'Contact'],
];

function renderLayout() {
    const page = document.body.dataset.page;

    const links = NAV.map(([href, label]) =>
        `<a href="${href}" class="nav__link${href.startsWith(page) ? ' is-active' : ''}">${label}</a>`
    ).join('');

    document.body.insertAdjacentHTML('afterbegin', `
        <header class="header">
            <div class="container">
                <a href="index.html" class="logo"><img src="images/logo-removebg-preview.png" alt="">GoûtAfricain</a>
                <nav class="nav">
                    ${links}
                    <a href="reservation.html" class="btn btn--sm">Réserver <i class="fa fa-arrow-right"></i></a>
                </nav>
                <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
            </div>
        </header>`);

    document.body.insertAdjacentHTML('beforeend', `
        <footer class="footer">
            <div class="container">
                <div class="footer__grid">
                    <div>
                        <a href="index.html" class="logo" style="margin-bottom:18px"><img src="images/logo-removebg-preview.png" alt="">GoûtAfricain</a>
                        <p>L'Afrique dans votre assiette : des recettes authentiques, des ingrédients frais et une table qui vous attend.</p>
                        <div class="socials">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4>Navigation</h4>
                        <ul class="footer__links">
                            <li><a href="menu.html"><i class="fa fa-angle-right"></i>Menu</a></li>
                            <li><a href="reservation.html"><i class="fa fa-angle-right"></i>Réservation</a></li>
                            <li><a href="contact.html"><i class="fa fa-angle-right"></i>Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer__contact">
                        <h4>Contact</h4>
                        <p><i class="fa fa-map-marker-alt"></i>Randa Bakwai, Zinder - Niger</p>
                        <p><i class="fa fa-phone-alt"></i>+227 96931275</p>
                        <p><i class="fa fa-envelope"></i>GoûtAfricain@gmail.com</p>
                    </div>
                    <div>
                        <h4>Horaires</h4>
                        <div class="hours">
                            <div><span>Lun – Ven</span><span>12h – 23h</span></div>
                            <div><span>Samedi</span><span>12h – 00h</span></div>
                            <div><span>Dimanche</span><span>12h – 22h</span></div>
                        </div>
                    </div>
                </div>
                <div class="footer__bottom">
                    <span>&copy; ${new Date().getFullYear()} GoûtAfricain, tous droits réservés.</span>
                    <a href="politique_conditions.html">Politique de confidentialité</a>
                </div>
            </div>
            <div class="footer__big" aria-hidden="true">GoûtAfricain</div>
        </footer>
        <a href="#" class="to-top" aria-label="Haut de page"><i class="fa fa-arrow-up"></i></a>
        <div class="toast" role="status"><i class="fa fa-check-circle"></i><span></span></div>`);
}

/* ---------- Écran de chargement (une fois par session) ---------- */
function initLoader() {
    let seen = false;
    try { seen = sessionStorage.getItem('ga-loaded'); sessionStorage.setItem('ga-loaded', '1'); } catch (e) {}

    const ready = () => document.body.classList.add('is-ready');
    if (seen || reduceMotion) { requestAnimationFrame(ready); return; }

    document.body.insertAdjacentHTML('afterbegin', `
        <div class="loader">
            <div class="loader__inner">
                <img src="images/logo-removebg-preview.png" alt="">
                <div class="loader__name">GoûtAfricain</div>
                <div class="loader__bar"><span></span></div>
            </div>
        </div>`);
    const loader = document.querySelector('.loader');
    document.body.classList.add('no-scroll');
    setTimeout(() => {
        loader.classList.add('is-done');
        document.body.classList.remove('no-scroll');
        setTimeout(ready, 500);
        setTimeout(() => loader.remove(), 1400);
    }, 1200);
}

/* ---------- En-tête : état au scroll + menu mobile ---------- */
function initHeader() {
    const header = document.querySelector('.header');
    const toTop = document.querySelector('.to-top');
    const onScroll = () => {
        header.classList.toggle('is-scrolled', scrollY > 40);
        toTop.classList.toggle('is-visible', scrollY > 600);
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    document.querySelector('.burger').addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        document.body.classList.toggle('no-scroll');
    });
    document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
        document.body.classList.remove('menu-open', 'no-scroll');
    }));
}

/* ---------- Titres découpés en mots ---------- */
function initSplit() {
    document.querySelectorAll('.split').forEach(el => {
        let i = 0;
        const wrap = node => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(part => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) { frag.append(' '); return; }
                        const w = document.createElement('span');
                        w.className = 'w';
                        w.innerHTML = `<span style="--i:${i++}">${part}</span>`;
                        frag.append(w);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === 1 && child.tagName !== 'BR') {
                    wrap(child);
                }
            });
        };
        wrap(el);
    });
}

/* ---------- Apparition au scroll ---------- */
function initReveal() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
        });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

/* ---------- Compteurs animés ---------- */
function initCounters() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const end = +el.dataset.count;
            const start = performance.now();
            const tick = now => {
                const p = Math.min((now - start) / 1800, 1);
                el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + (el.dataset.suffix || '');
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
        });
    }, { threshold: .6 });
    document.querySelectorAll('[data-count]').forEach(el => io.observe(el));
}

/* ---------- Parallaxe (scroll) ---------- */
function initParallax() {
    const items = [...document.querySelectorAll('[data-parallax]')];
    if (!items.length || reduceMotion) return;
    const update = () => {
        items.forEach(el => {
            const r = el.parentElement.getBoundingClientRect();
            const offset = (r.top + r.height / 2 - innerHeight / 2) * +el.dataset.parallax;
            el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
    };
    addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();
}

/* ---------- Profondeur à la souris (hero) ---------- */
function initDepth() {
    const scene = document.querySelector('[data-depth-scene]');
    if (!scene || reduceMotion || matchMedia('(hover: none)').matches) return;
    const layers = scene.querySelectorAll('[data-depth]');
    scene.addEventListener('mousemove', e => {
        const x = e.clientX / innerWidth - .5;
        const y = e.clientY / innerHeight - .5;
        layers.forEach(l => {
            const d = +l.dataset.depth;
            l.style.translate = `${x * d}px ${y * d}px`;
        });
    });
}

/* ---------- Cartes inclinables ---------- */
function initTilt() {
    if (reduceMotion || matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5;
            const y = (e.clientY - r.top) / r.height - .5;
            card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

/* ---------- FAQ (un seul élément ouvert) ---------- */
function initFaq() {
    const items = document.querySelectorAll('.faq__item');
    items.forEach(item => {
        item.querySelector('.faq__q').addEventListener('click', () => {
            const open = item.classList.contains('is-open');
            items.forEach(i => i.classList.remove('is-open'));
            item.classList.toggle('is-open', !open);
        });
    });
}

/* ---------- Notification ---------- */
function toast(message) {
    const el = document.querySelector('.toast');
    el.querySelector('span').textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('is-visible'), 3500);
}

/* ---------- Formulaire de contact (sans serveur) ---------- */
function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        form.reset();
        toast('Merci ! Votre message a bien été envoyé.');
    });
}

renderLayout();
initSplit();
initLoader();
initHeader();
initReveal();
initCounters();
initParallax();
initDepth();
initTilt();
initFaq();
initContactForm();
