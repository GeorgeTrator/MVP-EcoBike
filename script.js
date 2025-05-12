// GA e clics ... (mantém os eventos anteriores)

// QR Code expandido
const qrCode = document.getElementById('qr-code');
// criar overlay
const overlay = document.createElement('div');
overlay.id = 'qr-overlay';
const overlayImg = document.createElement('img');
overlayImg.src = 'imgs/siteQrCode.png';
overlay.appendChild(overlayImg);
document.body.appendChild(overlay);
// abrir e fechar overlay
qrCode.addEventListener('click', () => {
  overlay.style.display = 'flex';
});
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// restante do script: modal e eventos GA
const rentButtons = document.querySelectorAll('.rent-btn');
const modal       = document.getElementById('modal');
const closeBtn    = document.getElementById('close-modal');
const form        = document.getElementById('rental-form');
const fieldBairro    = document.getElementById('field-bairro');
const fieldDuracao   = document.getElementById('field-duracao');
const fieldBike      = document.getElementById('field-bike');
const fieldPagamento = document.getElementById('field-pagamento');

rentButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const bairro = btn.closest('.card').dataset.bairro;
    fieldBairro.value = bairro;
    modal.classList.remove('hidden');
    gtag('event', 'click_rent', { bairro });
  });
});

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
form.addEventListener('submit', () => {
  gtag('event', 'submit_rental', {
    bairro: fieldBairro.value,
    duracao: fieldDuracao.value,
    bike: fieldBike.value,
    pagamento: fieldPagamento.value
  });
  setTimeout(() => modal.classList.add('hidden'), 500);
});