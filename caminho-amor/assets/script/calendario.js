const daysContainer = document.querySelector('#days-container');
const monthYear = document.querySelector('#month-year');
const prevMonthBtn = document.querySelector('#prev-month');
const nextMonthBtn = document.querySelector('#next-month');
const modal = document.querySelector('#modal');
const modalInput = document.querySelector('#event-title');
const saveEventBtn = document.querySelector('#save-event');
const cancelEventBtn = document.querySelector('#cancel-event');
const addEventBtn = document.querySelector('#add-event');
const eventsContainer = document.querySelector('#events-container');

let selectedDate = null;
let events = {};

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function updateCalendar() {
    daysContainer.innerHTML = '';
    monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleDateString('pt-br', { month: 'long', year: 'numeric' })}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = i;
        dayDiv.addEventListener('click', () => selectDate(i));
        daysContainer.appendChild(dayDiv);
    }
}

function selectDate(day) {
    selectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
    document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
    document.querySelectorAll('.day')[day - 1].classList.add('selected');
    renderEvents();
}

function renderEvents() {
    eventsContainer.innerHTML = '';
    const dayEvents = events[selectedDate] || [];
    dayEvents.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        if (event.completed) eventDiv.classList.add('completed');
        eventDiv.textContent = event.name;
        eventDiv.addEventListener('click', () => toggleEvent(index));
        eventsContainer.appendChild(eventDiv);
    });
}

function toggleEvent(index) {
    const dayEvents = events[selectedDate];
    dayEvents[index].completed = !dayEvents[index].completed;
    renderEvents();
}

addEventBtn.addEventListener('click', () => {
    if (!selectedDate) return alert('Selecione um dia primeiro!');
    modal.style.display = 'flex';
});

saveEventBtn.addEventListener('click', () => {
    const eventName = modalInput.value;
    if (!eventName) return;
    events[selectedDate] = events[selectedDate] || [];
    events[selectedDate].push({ name: eventName, completed: false });
    modal.style.display = 'none';
    modalInput.value = '';
    renderEvents();
});

cancelEventBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

prevMonthBtn.addEventListener('click', () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    updateCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    updateCalendar();
});

updateCalendar();