const modal = document.getElementById("serviceModal");
const openModal = document.getElementById("openModalBtn");
const closeModal = document.getElementById("closeModalBtn");

const form = document.getElementById("serviceForm");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const durationInput = document.getElementById("duration");
const isActiveInput = document.getElementById("is_active");

//create
openModal.addEventListener("click", () => {
    modalTitle.textContent = "Új szolgáltatás";
    form.action = "/admin/services";
    form.reset();
    isActiveInput.value = "true";
    submitBtn.textContent = "Létrehozás";
    modal.classList.add("active");
});

//update
document.querySelectorAll(".editServiceBtn").forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.textContent = "Szolgáltatás módosítása";
        form.action = `/admin/services/${button.dataset.id}?_method=PATCH`;

        nameInput.value = button.dataset.name;
        descriptionInput.value = button.dataset.description;
        priceInput.value = button.dataset.price;
        durationInput.value = button.dataset.duration;
        isActiveInput.value = button.dataset.is_active;

        submitBtn.textContent = "Módosítás";
        modal.classList.add("active");
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

//sötét háttérre kattintva is bezáródik a modal (felugró ablak)
modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.classList.remove("active");
    }
});
