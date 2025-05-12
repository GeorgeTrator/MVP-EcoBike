// Eventos do formulário de aluguel
const rentButtons = document.querySelectorAll('.rent-btn');
const modal       = document.getElementById('modal');
const closeBtn    = document.getElementById('close-modal');
const form        = document.getElementById('rental-form');

const fieldBairro    = document.getElementById('field-bairro');
const fieldDuracao   = document.getElementById('field-duracao');
const fieldBike      = document.getElementById('field-bike');
const fieldPagamento = document.getElementById('field-pagamento');

// Abrir modal ao clicar em “Quero alugar”
rentButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const bairro = btn.closest('.card').dataset.bairro;
    fieldBairro.value = bairro;
    modal.classList.remove('hidden');
    gtag('event', 'click_rent', { bairro });
  });
});

// Fechar modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Submissão do formulário
form.addEventListener('submit', () => {
  gtag('event', 'submit_rental', {
    bairro: fieldBairro.value,
    duracao: fieldDuracao.value,
    bike: fieldBike.value,
    pagamento: fieldPagamento.value
  });
  setTimeout(() => modal.classList.add('hidden'), 500);
});

// Expansão do QR code
const qrCode = document.getElementById('qr-code');
const qrImg  = document.getElementById('qr-img');

qrCode.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'qr-overlay';
  const img = document.createElement('img');
  img.src = qrImg.src;
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', () => document.body.removeChild(overlay));
});
