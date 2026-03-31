const modal = document.getElementById("bikeModal");
const openModal = document.getElementById("openModalBtn");
const form = document.getElementById("bikeForm");
const title = document.getElementById("modalTitle");

const catalogIdInput = document.getElementById("catalog_id");
const categoryInput = document.getElementById("category");
const brandInput = document.getElementById("brand");
const modelInput = document.getElementById("model");
const cylinderInput = document.getElementById("cylinder");
const strokeInput = document.getElementById("stroke");
const generationInput = document.getElementById("generation");

const submitBtn = document.getElementById("submitBtn");
const closeModal = document.getElementById("closeModalBtn");

function setSelectOptions(select, items, placeholder, valueKey = null, textKey = null) {
    select.innerHTML = `<option value="">${placeholder}</option>`;

    items.forEach(item => {
        const option = document.createElement("option");

        if (valueKey && textKey) {
            option.value = item[valueKey];
            option.textContent = item[textKey];
        } else {
            const value = Object.values(item)[0];
            option.value = value;
            option.textContent = value;
        }

        select.appendChild(option);
    });

    select.disabled = false;
}

function resetSelect(select, placeholder) {
    select.innerHTML = `<option value="">${placeholder}</option>`;
    select.disabled = true;
}

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Hiba a lekérés során: ${response.status}`);
    }

    return await response.json();
}

async function loadBrands(category, selectedBrand = "") {
    if (!category) {
        brandInput.disabled = true;
        modelInput.disabled = true;
        cylinderInput.disabled = true;
        strokeInput.disabled = true;
        generationInput.disabled = true;

        brandInput.value = "";
        modelInput.value = "";
        cylinderInput.value = "";
        strokeInput.value = "";
        generationInput.value = "";
        return;
    }

    const brands = await fetchJson(`/auth/catalog/brands/${encodeURIComponent(category)}`);
    setSelectOptions(brandInput, brands, "Válassz márkát");

    brandInput.disabled = false;
    modelInput.disabled = true;
    cylinderInput.disabled = true;
    strokeInput.disabled = true;
    generationInput.disabled = true;

    brandInput.value = selectedBrand;
}

async function loadModels(category, brand, selectedModel = "") {
    if (!category || !brand) {
        resetSelect(modelInput, "Először válassz márkát");
        resetSelect(cylinderInput, "Először válassz modellt");
        resetSelect(strokeInput, "Először válassz hengert");
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const models = await fetchJson(
        `/auth/catalog/models/${encodeURIComponent(category)}/${encodeURIComponent(brand)}`
    );

    setSelectOptions(modelInput, models, "Válassz modellt");

    if (selectedModel) {
        modelInput.value = selectedModel;
    } else {
        modelInput.value = "";
    }

    resetSelect(cylinderInput, "Először válassz modellt");
    resetSelect(strokeInput, "Először válassz hengert");
    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadCylinders(category, brand, model, selectedCylinder = "") {
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

    if (selectedCylinder) {
        cylinderInput.value = String(selectedCylinder);
    } else {
        cylinderInput.value = "";
    }

    resetSelect(strokeInput, "Először válassz hengert");
    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadStrokes(category, brand, model, cylinder, selectedStroke = "") {
    if (!category || !brand || !model || !cylinder) {
        resetSelect(strokeInput, "Először válassz hengert");
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const strokes = await fetchJson(
        `/auth/catalog/strokes/${encodeURIComponent(category)}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(cylinder)}`
    );

    setSelectOptions(strokeInput, strokes, "Válassz ütemet");

    if (selectedStroke) {
        strokeInput.value = selectedStroke;
    } else {
        strokeInput.value = "";
    }

    resetSelect(generationInput, "Először válassz ütemet");
}

async function loadGenerations(category, brand, model, cylinder, stroke, selectedGeneration = "") {
    if (!category || !brand || !model || !cylinder || !stroke) {
        resetSelect(generationInput, "Először válassz ütemet");
        return;
    }

    const generations = await fetchJson(
        `/auth/catalog/generations/${encodeURIComponent(category)}/${encodeURIComponent(brand)}/${encodeURIComponent(model)}/${encodeURIComponent(cylinder)}/${encodeURIComponent(stroke)}`
    );

    setSelectOptions(generationInput, generations, "Válassz évjáratot");

    if (selectedGeneration) {
        generationInput.value = String(selectedGeneration);
    } else {
        generationInput.value = "";
    }
}

async function loadCatalogId() {
    const category = categoryInput.value;
    const brand = brandInput.value;
    const model = modelInput.value;
    const cylinder = cylinderInput.value;
    const stroke = strokeInput.value;
    const generation = generationInput.value;

    if (!category || !brand || !model || !cylinder || !stroke || !generation) {
        catalogIdInput.value = "";
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
            catalogIdInput.value = "";
            return;
        }

        const catalog = await response.json();
        catalogIdInput.value = catalog.id || "";
    } catch (error) {
        console.error("Hiba a catalog rekord lekérése során:", error);
        catalogIdInput.value = "";
    }
}

function resetBikeFormForCreate() {
    form.reset();
    form.action = "/auth/bikes";
    title.textContent = "Új motor";
    submitBtn.textContent = "Létrehozás";
    catalogIdInput.value = "";
}

if (openModal) {
    openModal.addEventListener("click", () => {
        resetBikeFormForCreate();
        modal.classList.add("active");
    });
}

categoryInput.addEventListener("change", async () => {
    try {
        await loadBrands(categoryInput.value);
    } catch (error) {
        console.error(error);
    }
    await loadCatalogId();
});

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

generationInput.addEventListener("change", async () => {
    await loadCatalogId();
});

document.querySelectorAll(".editBikeBtn").forEach(button => {
    button.addEventListener("click", async () => {
        try {
            title.textContent = "Motor módosítása";
            form.action = `/auth/bikes/${button.dataset.id}?_method=PATCH`;
            submitBtn.textContent = "Mentés";

            catalogIdInput.value = button.dataset.catalogId || "";

            const category = button.dataset.category || "";
            const brand = button.dataset.brand || "";
            const model = button.dataset.model || "";
            const cylinder = button.dataset.cylinder || "";
            const stroke = button.dataset.stroke || "";
            const generation = button.dataset.generation || "";

            categoryInput.value = category;

            await loadBrands(category, brand);
            await loadModels(category, brand, model);
            await loadCylinders(category, brand, model, cylinder);
            await loadStrokes(category, brand, model, cylinder, stroke);
            await loadGenerations(category, brand, model, cylinder, stroke, generation);
            await loadCatalogId();

            modal.classList.add("active");
        } catch (error) {
            console.error("Hiba a motor módosító modal megnyitásakor:", error);
        }
    });
});

if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });
}

if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}
