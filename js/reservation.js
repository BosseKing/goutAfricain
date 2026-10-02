/* =========================================================
   GoûtAfricain — réservation en ligne (table → coordonnées → paiement → confirmation)
   Le paiement est simulé côté navigateur : à brancher sur un vrai prestataire
   (Stripe, CinetPay, PayDunya…) avant la mise en production.
   ========================================================= */

const DEPOSIT_PER_GUEST = 10;
const MAX_GUESTS = 12;
const DAYS_AHEAD = 14;

const form = document.querySelector('#booking');
const panels = [...form.querySelectorAll('.panel')];
const progressSteps = [...form.querySelectorAll('.progress__step')];
const $ = sel => form.querySelector(sel);

const state = { step: 0, date: null, time: null, guests: 2, zone: 'Salle principale' };

/* ---------- Récapitulatif ---------- */
const fmtDate = d => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const plural = n => `${n} personne${n > 1 ? 's' : ''}`;

function setSummary(key, value) {
    document.querySelectorAll(`[data-sum="${key}"]`).forEach(el => {
        if (el.textContent === value) return;
        el.textContent = value;
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
    });
}

function updateSummary() {
    setSummary('date', state.date ? fmtDate(state.date) : '—');
    setSummary('time', state.time || '—');
    setSummary('guests', plural(state.guests));
    setSummary('zone', state.zone);
    setSummary('name', $('#name').value.trim() || '—');
    setSummary('deposit', `${state.guests * DEPOSIT_PER_GUEST} dt`);
}

/* ---------- Étape 1 : date, convives, créneau, espace ---------- */
function renderDays() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let html = '';
    for (let i = 0; i < DAYS_AHEAD; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const label = i === 0 ? "Auj." : d.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '');
        html += `<button type="button" class="day" data-date="${d.toISOString()}">
                    <small>${label}</small><strong>${d.getDate()}</strong><small>${d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</small>
                 </button>`;
    }
    $('#days').innerHTML = html;
}

function slotsFor(date) {
    const closing = date.getDay() === 0 ? 21 : 22; // dimanche : fermeture plus tôt
    const lunch = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
    const dinner = [];
    for (let h = 19; h <= closing; h++) dinner.push(`${h}:00`, `${h}:30`);
    if (dinner.at(-1) === `${closing}:30`) dinner.pop();
    return { lunch, dinner };
}

// Simule des créneaux déjà complets (toujours les mêmes pour une date donnée)
const isFull = (date, time) => [...(date.toDateString() + time)].reduce((a, c) => a + c.charCodeAt(0), 0) % 6 === 0;

function renderSlots() {
    const box = $('#slots');
    if (!state.date) { box.innerHTML = '<p class="slots__title">Choisissez d\'abord une date</p>'; return; }
    const now = new Date();
    const { lunch, dinner } = slotsFor(state.date);
    const btn = t => {
        const [h, m] = t.split(':');
        const when = new Date(state.date); when.setHours(h, m);
        const disabled = when < now || isFull(state.date, t);
        return `<button type="button" class="slot${state.time === t ? ' is-selected' : ''}" data-time="${t}"${disabled ? ' disabled' : ''}>${t.replace(':', 'h')}</button>`;
    };
    box.innerHTML = `<span class="slots__title"><i class="fa fa-sun"></i>Déjeuner</span>${lunch.map(btn).join('')}
                     <span class="slots__title"><i class="fa fa-moon"></i>Dîner</span>${dinner.map(btn).join('')}`;
}

$('#days').addEventListener('click', e => {
    const day = e.target.closest('.day');
    if (!day) return;
    $('#days .is-selected')?.classList.remove('is-selected');
    day.classList.add('is-selected');
    state.date = new Date(day.dataset.date);
    state.time = null;
    renderSlots();
    updateSummary();
});

$('#slots').addEventListener('click', e => {
    const slot = e.target.closest('.slot');
    if (!slot) return;
    $('#slots .is-selected')?.classList.remove('is-selected');
    slot.classList.add('is-selected');
    state.time = slot.textContent;
    updateSummary();
});

form.querySelectorAll('[data-guests]').forEach(b => b.addEventListener('click', () => {
    state.guests = Math.min(MAX_GUESTS, Math.max(1, state.guests + +b.dataset.guests));
    $('#guests').textContent = plural(state.guests);
    updateSummary();
}));

form.querySelectorAll('[name="zone"]').forEach(r => r.addEventListener('change', () => {
    state.zone = r.value;
    updateSummary();
}));

$('#name').addEventListener('input', updateSummary);

/* ---------- Validation ---------- */
function check(input, valid) {
    input.closest('.field').classList.toggle('has-error', !valid);
    return valid;
}

const luhn = num => {
    let sum = 0;
    [...num].reverse().forEach((d, i) => {
        let n = +d;
        if (i % 2) { n *= 2; if (n > 9) n -= 9; }
        sum += n;
    });
    return num.length >= 13 && sum % 10 === 0;
};

const validExpiry = val => {
    const [mm, yy] = val.split('/').map(Number);
    if (!mm || mm > 12 || yy === undefined || isNaN(yy)) return false;
    return new Date(2000 + yy, mm) > new Date();
};

const validators = [
    () => {
        if (!state.date) { toast('Choisissez une date pour votre réservation.'); return false; }
        if (!state.time) { toast('Choisissez un créneau horaire.'); return false; }
        return true;
    },
    () => [
        check($('#name'), $('#name').value.trim().length > 1),
        check($('#email'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').value.trim())),
        check($('#phone'), $('#phone').value.replace(/\D/g, '').length >= 8),
    ].every(Boolean),
    () => {
        let ok;
        if (form.elements.method.value === 'card') {
            ok = [
                check($('#card-number'), luhn($('#card-number').value.replace(/\s/g, ''))),
                check($('#card-name'), $('#card-name').value.trim().length > 1),
                check($('#card-exp'), validExpiry($('#card-exp').value)),
                check($('#card-cvv'), /^\d{3,4}$/.test($('#card-cvv').value)),
            ].every(Boolean);
        } else {
            ok = check($('#momo-phone'), $('#momo-phone').value.replace(/\D/g, '').length >= 8);
        }
        const terms = $('#terms').checked;
        $('#terms-wrap').classList.toggle('has-error', !terms);
        return ok && terms;
    },
];

form.querySelectorAll('.field input').forEach(input =>
    input.addEventListener('input', () => input.closest('.field').classList.remove('has-error'))
);

/* ---------- Navigation entre étapes ---------- */
function goTo(step) {
    const back = step < state.step;
    panels[state.step].classList.remove('is-active');
    state.step = step;
    panels[step].classList.add('is-active');
    panels[step].classList.toggle('is-back', back);
    progressSteps.forEach((s, i) => {
        s.classList.toggle('is-active', i === step);
        s.classList.toggle('is-done', i < step);
    });
    form.style.setProperty('--p', step / (panels.length - 1));
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => {
    if (validators[state.step]()) goTo(state.step + 1);
}));
form.querySelectorAll('[data-prev]').forEach(b => b.addEventListener('click', () => goTo(state.step - 1)));

/* ---------- Carte bancaire animée ---------- */
const cardNumber = $('#card-number');
cardNumber.addEventListener('input', () => {
    const digits = cardNumber.value.replace(/\D/g, '').slice(0, 16);
    cardNumber.value = digits.replace(/(.{4})/g, '$1 ').trim();
    $('#cv-number').textContent = (digits + '•'.repeat(16 - digits.length)).replace(/(.{4})/g, '$1 ').trim();
});

$('#card-name').addEventListener('input', e => {
    $('#cv-name').textContent = e.target.value.toUpperCase() || 'VOTRE NOM';
});

$('#card-exp').addEventListener('input', e => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 4);
    e.target.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    $('#cv-exp').textContent = e.target.value || 'MM/AA';
});

const cvv = $('#card-cvv');
cvv.addEventListener('input', () => {
    cvv.value = cvv.value.replace(/\D/g, '');
    $('#cv-cvv').textContent = '•'.repeat(cvv.value.length) || '•••';
});
cvv.addEventListener('focus', () => $('#card3d').classList.add('is-flipped'));
cvv.addEventListener('blur', () => $('#card3d').classList.remove('is-flipped'));

form.querySelectorAll('[name="method"]').forEach(r => r.addEventListener('change', () => {
    $('#pay-card').hidden = r.value !== 'card';
    $('#pay-momo').hidden = r.value !== 'momo';
}));

/* ---------- Paiement (simulé) et confirmation ---------- */
form.addEventListener('submit', e => {
    e.preventDefault();
    if (state.step !== 2 || !validators[2]()) return;

    const btn = $('#pay-btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Paiement en cours…';

    setTimeout(() => {
        showConfirmation();
        goTo(3);
    }, 2200);
});

function showConfirmation() {
    const code = 'GA-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const first = $('#name').value.trim().split(' ')[0];
    $('#confirmation').innerHTML = `
        <div class="success">
            <svg class="success__check" viewBox="0 0 110 110"><circle cx="55" cy="55" r="50"/><path d="M33 57 l15 15 l30 -32"/></svg>
            <h2>Réservation confirmée !</h2>
            <p>Merci ${first}, votre table est réservée le <strong>${fmtDate(state.date)}</strong> à <strong>${state.time}</strong>
               pour <strong>${plural(state.guests)}</strong> (${state.zone}).<br>
               Un e-mail de confirmation a été envoyé à <strong>${$('#email').value.trim()}</strong>.</p>
            <div class="success__code">${code}</div>
            <p style="margin-bottom:28px">Acompte réglé : <strong>${state.guests * DEPOSIT_PER_GUEST} dt</strong> — présentez ce code à l'accueil.</p>
            <div class="success__actions">
                <button type="button" class="btn btn--dark" onclick="print()"><i class="fa fa-print"></i> Imprimer</button>
                <a href="index.html" class="btn">Retour à l'accueil</a>
            </div>
        </div>`;
    confetti($('#confirmation .success'));
}

function confetti(container) {
    const colors = ['#FEA116', '#0F172B', '#df8a09', '#F1F8FF'];
    for (let i = 0; i < 60; i++) {
        const c = document.createElement('span');
        c.className = 'confetti';
        c.style.background = colors[i % colors.length];
        c.style.setProperty('--x', `${(Math.random() - .5) * 700}px`);
        c.style.setProperty('--y', `${Math.random() * 500 - 100}px`);
        c.style.setProperty('--r', `${Math.random() * 720}deg`);
        c.style.animationDelay = `${Math.random() * .3}s`;
        container.append(c);
        setTimeout(() => c.remove(), 2200);
    }
}

renderDays();
$('#days .day').click();
renderSlots();
updateSummary();
