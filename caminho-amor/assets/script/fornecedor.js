const guestContainer = document.querySelector('#guest-container');
const totalGuests = document.querySelector('#total-guests');
const confirmedGuests = document.querySelector('#confirmed-guests');
const declinedGuests = document.querySelector('#declined-guests');
const btnAddGuest = document.querySelector('#btn-add-guest');
const btnRemoveGuest = document.querySelector('#btn-remove-guest');
const modal = document.querySelector('#modal');
const modalInput = document.querySelector('#modal-input');
const modalSave = document.querySelector('#modal-save');
const modalCancel = document.querySelector('#modal-cancel');

let guests = [];
let confirmed = 0;
let declined = 0;

// Atualizar painel de informações
function updateInfoPanel() {
    totalGuests.textContent = guests.length;
    confirmedGuests.textContent = confirmed;
    declinedGuests.textContent = declined;
}

// Abrir o modal
btnAddGuest.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalInput.value = '';
});

// Fechar o modal
modalCancel.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Adicionar convidado
modalSave.addEventListener('click', () => {
    const name = modalInput.value.trim();
    if (name) {
        guests.push({ name, status: 'Pendente' });
        renderGuests();
        updateInfoPanel();
        modal.style.display = 'none';
    }
});

// Renderizar lista de convidados
function renderGuests() {
    guestContainer.innerHTML = '';
    guests.forEach((guest, index) => {
        const li = document.createElement('li');
        li.classList.add('guest-item');
        li.innerHTML = `
            <span>${guest.name} (${guest.status})</span>
            <div>
                <button onclick="markAsConfirmed(${index})">Confirmar</button>
                <button onclick="markAsDeclined(${index})">Desistir</button>
                <button onclick="removeGuest(${index})" style="background-color: #dc3545;">Remover</button>
            </div>
        `;
        guestContainer.appendChild(li);
    });
}

// Marcar como confirmado
function markAsConfirmed(index) {
    if (guests[index].status !== 'Confirmado') {
        if (guests[index].status === 'Desistiu') declined--;
        guests[index].status = 'Confirmado';
        confirmed++;
        renderGuests();
        updateInfoPanel();
    }
}

// Marcar como desistente
function markAsDeclined(index) {
    if (guests[index].status !== 'Desistiu') {
        if (guests[index].status === 'Confirmado') confirmed--;
        guests[index].status = 'Desistiu';
        declined++;
        renderGuests();
        updateInfoPanel();
    }
}

// Remover convidado
function removeGuest(index) {
    const status = guests[index].status;
    if (status === 'Confirmado') confirmed--;
    else if (status === 'Desistiu') declined--;
    guests.splice(index, 1);
    renderGuests();
    updateInfoPanel();
}