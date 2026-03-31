const savedBikeSection = document.getElementById("savedBikeSection");
const savedBikeMode = document.getElementById("savedBikeMode");
const manualBikeMode = document.getElementById("manualBikeMode");
const manualBikeSection = document.getElementById("manualBikeSection");

const bikeIdSelect = document.getElementById("bike_id");
const catalogIdInput = document.getElementById("catalog_id");

const categoryInput = document.getElementById("bike_category");
const brandInput = document.getElementById("bike_brand");
const modelInput = document.getElementById("bike_model");
const cylinderInput = document.getElementById("bike_cylinder");
const strokeInput = document.getElementById("bike_stroke");
const generationInput = document.getElementById("bike_generation");

const manualInputs = [
    categoryInput,
    brandInput,
    modelInput,
    cylinderInput,
    strokeInput,
    generationInput
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

function resetSelect(select, placeholder) {
    if (!select) return;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    select.disabled = true;
}

function setSelectOptions(select, items, placeholder) {
    if (!select) return;

    select.innerHTML = `<option value="">${placeholder}</option>`;

    items.forEach(item => {
        const option = document.createElement("option");
        const value = Object.values(item)[0];
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });

    select.disabled = false;
}

function resetManualCatalogFields() {
    if (catalogIdInput) {
        catalogIdInput.value = "";
    }

    resetSelect(brandInput, "Először válassz kategóriát");
    resetSelect(modelInput, "Először válassz gyártmányt");
    resetSelect(cylinderInput, "Először válassz modellt");
    resetSelect(strokeInput, "Először válassz hengert");
    resetSelect(generationInput, "Először válassz ütemet");
}

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Hiba a lekérés során: ${response.status}`);
    }

    return await response.json();
}

async function loadBrands(category) {
    if (!category) {
        resetManualCatalogFields();
        return;
    }

    const brands = await fetchJson(`/auth/catalog/brands/${encodeURIComponent(category)}`);
    setSelectOptions(brandInput, brands, "Válassz gyártmányt");

    resetSelect(modelInput, "Először válassz gyártmányt");
    resetSelect(cylinderInput, "Először válassz modellt");
    resetSelect(strokeInput, "Először válassz hengert");
    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadModels(category, brand) {
    if (!category || !brand) {
        resetSelect(modelInput, "Először válassz gyártmányt");
        resetSelect(cylinderInput, "Először válassz modellt");
        resetSelect(strokeInput, "Először válassz hengert");
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const models = await fetchJson(
        `/auth/catalog/models/${encodeURIComponent(category)}/${encodeURIComponent(brand)}`
    );

    setSelectOptions(modelInput, models, "Válassz modellt");

    resetSelect(cylinderInput, "Először válassz modellt");
    resetSelect(strokeInput, "Először válassz hengert");
    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadCylinders(category, brand, model) {
    if (!category || !brand || !model) {
        resetSelect(cylinderInput, "Először válassz modellt");
        resetSelect(strokeInput, "Először válassz hengert");
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const cylinders = await fetchJson(
        `/auth/catalog/cylinders/${encodeURIComponent(category)}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}`
    );

    setSelectOptions(cylinderInput, cylinders, "Válassz hengert");

    resetSelect(strokeInput, "Először válassz hengert");
    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadStrokes(category, brand, model, cylinder) {
    if (!category || !brand || !model || !cylinder) {
        resetSelect(strokeInput, "Először válassz hengert");
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const strokes = await fetchJson(
        `/auth/catalog/strokes/${encodeURIComponent(category)}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(cylinder)}`
    );

    setSelectOptions(strokeInput, strokes, "Válassz ütemet");

    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadGenerations(category, brand, model, cylinder, stroke) {
    if (!category || !brand || !model || !cylinder || !stroke) {
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const generations = await fetchJson(
        `/auth/catalog/generations/${encodeURIComponent(category)}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(cylinder)}/${encodeURIComponent(stroke)}`
    );

    setSelectOptions(generationInput, generations, "Válassz évjáratot");
}

async function loadCatalogId() {
    const category = categoryInput?.value;
    const brand = brandInput?.value;
    const model = modelInput?.value;
    const cylinder = cylinderInput?.value;
    const stroke = strokeInput?.value;
    const generation = generationInput?.value;

    if (!category || !brand || !model || !cylinder || !stroke || !generation) {
        if (catalogIdInput) {
            catalogIdInput.value = "";
        }
        return;
    }

    try {
        const response = await fetch("/auth/catalog/selection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category,
                brand,
                model,
                cylinder,
                stroke,
                generation
            })
        });

        if (!response.ok) {
            if (catalogIdInput) {
                catalogIdInput.value = "";
            }
            return;
        }

        const catalog = await response.json();

        if (catalogIdInput) {
            catalogIdInput.value = catalog.id || "";
        }
    } catch (error) {
        console.error("Hiba a catalog rekord lekérése során:", error);
        if (catalogIdInput) {
            catalogIdInput.value = "";
        }
    }
}

function toggleBikeMode() {
    if (savedBikeMode && savedBikeMode.checked) {
        if (savedBikeSection) {
            savedBikeSection.classList.remove("hidden");
        }

        if (manualBikeSection) {
            manualBikeSection.classList.add("hidden");
        }

        if (bikeIdSelect) {
            bikeIdSelect.setAttribute("required", "required");
        }

        if (catalogIdInput) {
            catalogIdInput.value = "";
        }

        setManualRequired(false);
    } else {
        if (savedBikeSection) {
            savedBikeSection.classList.add("hidden");
        }

        if (manualBikeSection) {
            manualBikeSection.classList.remove("hidden");
        }

        if (bikeIdSelect) {
            bikeIdSelect.removeAttribute("required");
            bikeIdSelect.value = "";
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

if (categoryInput) {
    categoryInput.addEventListener("change", async () => {
        try {
            await loadBrands(categoryInput.value);
        } catch (error) {
            console.error(error);
            resetManualCatalogFields();
        }
        await loadCatalogId();
    });
}

if (brandInput) {
    brandInput.addEventListener("change", async () => {
        try {
            await loadModels(categoryInput.value, brandInput.value);
        } catch (error) {
            console.error(error);
            resetSelect(modelInput, "Hiba történt");
            resetSelect(cylinderInput, "Először válassz modellt");
            resetSelect(strokeInput, "Először válassz hengert");
            resetSelect(generationInput, "Először válassz ütemet");
        }
        await loadCatalogId();
    });
}

if (modelInput) {
    modelInput.addEventListener("change", async () => {
        try {
            await loadCylinders(categoryInput.value, brandInput.value, modelInput.value);
        } catch (error) {
            console.error(error);
            resetSelect(cylinderInput, "Hiba történt");
            resetSelect(strokeInput, "Először válassz hengert");
            resetSelect(generationInput, "Először válassz ütemet");
        }
        await loadCatalogId();
    });
}

if (cylinderInput) {
    cylinderInput.addEventListener("change", async () => {
        try {
            await loadStrokes(
                categoryInput.value,
                brandInput.value,
                modelInput.value,
                cylinderInput.value
            );
        } catch (error) {
            console.error(error);
            resetSelect(strokeInput, "Hiba történt");
            resetSelect(generationInput, "Először válassz ütemet");
        }
        await loadCatalogId();
    });
}

if (strokeInput) {
    strokeInput.addEventListener("change", async () => {
        try {
            await loadGenerations(
                categoryInput.value,
                brandInput.value,
                modelInput.value,
                cylinderInput.value,
                strokeInput.value
            );
        } catch (error) {
            console.error(error);
            resetSelect(generationInput, "Hiba történt");
        }
        await loadCatalogId();
    });
}

if (generationInput) {
    generationInput.addEventListener("change", async () => {
        await loadCatalogId();
    });
}

toggleBikeMode();
