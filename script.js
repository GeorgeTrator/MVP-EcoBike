// Seleciona elementos
const rentButtons = document.querySelectorAll('.rent-btn');
const modal       = document.getElementById('modal');
const closeBtn    = document.getElementById('close-modal');
const form        = document.getElementById('rental-form');

// Campos do form
const fieldBairro    = document.getElementById('field-bairro');
const fieldDuracao   = document.getElementById('field-duracao');
const fieldBike      = document.getElementById('field-bike');
const fieldPagamento = document.getElementById('field-pagamento');
const fieldEmail     = document.getElementById('field-email');

// Abre modal e pré-preenche bairro
rentButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const bairro = btn.closest('.card').dataset.bairro;
    fieldBairro.value = bairro;
    modal.classList.remove('hidden');
    // Evento no GA
    gtag('event', 'click_rent', { 'bairro': bairro });
  });
});

// Fecha modal
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Ao enviar formulário
form.addEventListener('submit', () => {
  gtag('event', 'submit_rental', {
    'bairro': fieldBairro.value,
    'duracao': fieldDuracao.value,
    'bike': fieldBike.value,
    'pagamento': fieldPagamento.value
  });
  // deixa o modal fechado após enviar
  setTimeout(() => modal.classList.add('hidden'), 500);
});
