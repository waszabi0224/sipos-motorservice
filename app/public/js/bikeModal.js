const modal = document.getElementById("bikeModal");
const openModal = document.getElementById("openModalBtn");
const form = document.getElementById("bikeForm");
const title = document.getElementById("modalTitle");

const brandInput = document.getElementById("brand");
const modelInput = document.getElementById("model");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const strokeInput = document.getElementById("stroke");
const cylinderInput = document.getElementById("cylinder");
const generationInput = document.getElementById("generation");

const submitBtn = document.getElementById("submitBtn");
const closeModal = document.getElementById("closeModalBtn");

//create
openModal.addEventListener("click", () => {
    title.textContent = "Új motor";
    form.action = "/auth/bikes";
    form.reset();
    submitBtn.textContent = "Létrehozás";
    modal.classList.add("active");
});

//update
document.querySelectorAll(".editBikeBtn").forEach(button => {
    button.addEventListener("click", () => {
        title.textContent = "Motor módosítása";
        form.action = `/auth/bikes/${button.dataset.id}?_method=PATCH`;

        brandInput.value = button.dataset.brand;
        modelInput.value = button.dataset.model;
        typeInput.value = button.dataset.type;
        categoryInput.value = button.dataset.category;
        strokeInput.value = button.dataset.stroke;
        cylinderInput.value = button.dataset.cylinder;
        generationInput.value = button.dataset.generation;

        submitBtn.textContent = "Mentés";
        modal.classList.add("active");
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.classList.remove("active");
    }
});
