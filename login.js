// =============================
// Seletores principais
// =============================
const FORM      = document.getElementById('login-form');
const EMAIL     = document.getElementById('email');
const SENHA     = document.getElementById('senha');
const ERRO      = document.getElementById('erro');
const CONTENT   = document.getElementById('restricted-content');
const QR        = document.getElementById('qr-code');
const TIMER     = document.getElementById('timer');
const PUBLIC_IMG_CONTAINER = document.getElementById('publico-img-container');
const PUBLIC_IMG           = document.getElementById('publico-img');

// Credenciais fixas
const USER = 'Ecobike@gmail.com';
const PASS = 'Legal590';

// =============================
// 1) Tratamento do submit de login
// =============================
FORM.addEventListener('submit', e => {
  e.preventDefault();
  if (
    EMAIL.value.trim().toLowerCase() === USER.toLowerCase() &&
    SENHA.value === PASS
  ) {
    FORM.classList.add('hidden');
    ERRO.classList.add('hidden');
    CONTENT.classList.remove('hidden');
    iniciarContagem();
    iniciarSlideshow();
    bindPublicoImageToggle();
  } else {
    ERRO.classList.remove('hidden');
  }
});

// =============================
// 2) Overlay do QR Code
// =============================
QR.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'qr-overlay';
  overlay.innerHTML = `<img src="${QR.querySelector('img').src}">`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', () => overlay.remove());
});

// =============================
// 3) Contagem regressiva
// =============================
function iniciarContagem() {
  let timeLeft = 540;
  TIMER.textContent = `${timeLeft} s`;

  const countdown = setInterval(() => {
    timeLeft--;
    TIMER.textContent = `${timeLeft} s`;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      iniciarTransicaoFinal();
    }
  }, 1000);
}

// =============================
// 4) Navegação entre slides
// =============================
function iniciarSlideshow() {
  const slides = Array.from(document.querySelectorAll('.slide'))
    .reduce((obj, el) => (obj[el.id] = el, obj), {});
  document.querySelectorAll('.next-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
      const current = arrow.closest('.slide');
      const nextId  = arrow.dataset.next;
      current.classList.add('hidden');
      slides[nextId].classList.remove('hidden');
    });
  });
}

// =============================
// 5) Toggle imagem do slide 2
// =============================
function bindPublicoImageToggle() {
  let showingOriginal = true;
  PUBLIC_IMG_CONTAINER.addEventListener('click', () => {
    showingOriginal = !showingOriginal;
    PUBLIC_IMG.src = showingOriginal
      ? 'imgs/jovens.png'
      : 'imgs/kids.png';
    // ajusta tamanho se for a imagem de crianças
    PUBLIC_IMG.style.maxWidth = showingOriginal ? '100%' : '70%';
  });
  // amplia ao duplo clique
  PUBLIC_IMG_CONTAINER.addEventListener('dblclick', () => {
    const overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    overlay.innerHTML = `<img src="${PUBLIC_IMG.src}">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
}

// =============================
// 6) Transição para tela final
// =============================
function iniciarTransicaoFinal() {
  CONTENT.innerHTML = '';
  document.body.classList.add('fade-to-black');
  TIMER.classList.add('move-to-center');

  const skull = document.createElement('img');
  skull.src = 'imgs/caveira.png';
  skull.id  = 'skull';
  document.body.appendChild(skull);
  setTimeout(() => skull.classList.add('fade-in'), 50);

  TIMER.textContent = 'Tempo Esgotado!';
}
