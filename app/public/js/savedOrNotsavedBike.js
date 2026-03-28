const savedBikeSection = document.getElementById("savedBikeSection");
const savedBikeMode = document.getElementById("savedBikeMode");
const manualBikeMode = document.getElementById("manualBikeMode");
const manualBikeSection = document.getElementById("manualBikeSection");

const bike_id = document.getElementById("bike_id");

const manualInputs = [
    document.getElementById("bike_brand"),
    document.getElementById("bike_model"),
    document.getElementById("bike_type"),
    document.getElementById("bike_category"),
    document.getElementById("bike_stroke"),
    document.getElementById("bike_cylinder"),
    document.getElementById("bike_generation")
].filter(Boolean);

function setManualRequired(required) {
    manualInputs.forEach(input => {
        if (required) {
            input.setAttribute("required", "required");
        } else {
            input.removeAttribute("required");
        }
    });
}

function toggleBikeMode() {
    if (savedBikeMode && savedBikeMode.checked) {
        savedBikeSection.classList.remove("hidden");
        manualBikeSection.classList.add("hidden");

        if (bike_id) {
            bike_id.setAttribute("required", "required");
        }

        setManualRequired(false);
    } else {
        if (savedBikeSection) {
            savedBikeSection.classList.add("hidden");
        }

        manualBikeSection.classList.remove("hidden");

        if (bike_id) {
            bike_id.removeAttribute("required");
            bike_id.value = "";
        }

        setManualRequired(true);
    }
}

if (savedBikeMode) {
    savedBikeMode.addEventListener("change", toggleBikeMode);
}

if (manualBikeMode) {
    manualBikeMode.addEventListener("change", toggleBikeMode);
}

toggleBikeMode();
