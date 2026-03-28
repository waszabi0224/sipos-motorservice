const checkboxes = document.querySelectorAll(".serviceCheckbox");
const nextBtn = document.getElementById("nextBtn");

function updateButtonState() {
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    nextBtn.disabled = !atLeastOneChecked;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateButtonState);
});

updateButtonState();
