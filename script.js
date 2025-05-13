// — Rotação parallax do hero com 3 imagens —
const hero = document.getElementById('hero');
const images = [
  'imgs/bike1.png',
  'imgs/bike2.png',
  'imgs/bike3.png',
  'imgs/Logo.png'
];
let idx = 0;
function rotateHero() {
  hero.style.backgroundImage = `url('${images[idx]}')`;
  idx = (idx + 1) % images.length;
}
rotateHero();
setInterval(rotateHero, 5000);

// — Modal de aluguel —
const rentButtons = document.querySelectorAll('.rent-btn');
const modal       = document.getElementById('modal');
const closeBtn    = document.getElementById('close-modal');
const form        = document.getElementById('rental-form');
const fieldBairro    = document.getElementById('field-bairro');
const fieldDuracao   = document.getElementById('field-duracao');
const fieldBike      = document.getElementById('field-bike');
const fieldPagamento = document.getElementById('field-pagamento');

// Abre e registra clique
rentButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const bairro = btn.closest('.card').dataset.bairro;
    fieldBairro.value = bairro;
    modal.classList.remove('hidden');
    gtag('event', 'click_rent', { bairro });
  });
});

// Fecha modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Submissão de aluguel
form.addEventListener('submit', () => {
  gtag('event', 'submit_rental', {
    bairro: fieldBairro.value,
    duracao: fieldDuracao.value,
    bike: fieldBike.value,
    pagamento: fieldPagamento.value
  });
  setTimeout(() => modal.classList.add('hidden'), 500);
});

// — Modal de Newsletter —
const newsLink   = document.getElementById('nav-news');
const newsModal  = document.getElementById('newsletter');
const closeNews  = document.getElementById('close-news');
const newsForm   = document.getElementById('newsletter-form');

newsLink.addEventListener('click', e => {
  e.preventDefault();
  newsModal.classList.remove('hidden');
  gtag('event', 'open_newsletter');
});
closeNews.addEventListener('click', () => newsModal.classList.add('hidden'));
newsForm.addEventListener('submit', () => {
  gtag('event', 'submit_newsletter', {
    name: newsForm.querySelector('input[name="entry.NOME_ID"]').value
  });
  setTimeout(() => newsModal.classList.add('hidden'), 500);
});

// — QR code overlay —
const qrCode = document.getElementById('qr-code');
qrCode.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'qr-overlay';
  overlay.innerHTML = `<img src="${qrCode.querySelector('img').src}">`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', () => overlay.remove());
});
