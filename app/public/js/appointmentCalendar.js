const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const appointmentDateInput = document.getElementById("appointment_date");
const selectedDateText = document.getElementById("selectedDateText");

let currentDate = new Date();
let selectedDate = null;

const monthNames = [
    "Január", "Február", "Március", "Április", "Május", "Június",
    "Július", "Augusztus", "Szeptember", "Október", "November", "December"
];

//ez a függvény formázza a dátumot úgy, hogy ha a hónap/nap 1 számjegyű, elétesz egy 0-t (pl. 2026-04-01)
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

//két dátumot összehasonlít, ha egyenllő, akkor true, amúgy false
function isSameDay(date1, date2) {
    return formatDate(date1) === formatDate(date2);
}

//
function renderCalendar() {
    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    let startDay = firstDayOfMonth.getDay();

    // vasárnap=0 helyett hétfő-alapú igazítás
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate(); //visszaadja, hány napos a hónap
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-day", "empty");
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);

        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
        dayCell.textContent = day;

        if (date < today) {
            dayCell.classList.add("past");
        }

        if (selectedDate && isSameDay(date, selectedDate)) {
            dayCell.classList.add("selected");
        }

        dayCell.addEventListener("click", () => {
            selectedDate = date;
            appointmentDateInput.value = formatDate(date);
            selectedDateText.textContent = formatDate(date);
            renderCalendar();
        });

        calendarGrid.appendChild(dayCell);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
