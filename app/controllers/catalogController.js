import { getBrandsBySelection, getModelsBySelection, getCylindersBySelection, getStrokesBySelection, getGenerationsBySelection, getCatalogBySelection, getCatalogById } from "../models/catalogModel.js";

const showBrandsBySelection = async (req, res) => {
    try {
        const { category } = req.params;
        const brands = await getBrandsBySelection(category);
        return res.json(brands);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt a márkák lekérése során."
        });
    }
};

const showModelsBySelection = async (req, res) => {
    try {
        const { category, brand } = req.params;
        const models = await getModelsBySelection(category, brand);
        return res.json(models);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt a modellek lekérése során."
        });
    }
};

const showCylindersBySelection = async (req, res) => {
    try {
        const { category, brand, model } = req.params;
        const cylinders = await getCylindersBySelection(category, brand, model);
        return res.json(cylinders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt a hengerek lekérése során."
        });
    }
};

const showStrokesBySelection = async (req, res) => {
    try {
        const { category, brand, model, cylinder } = req.params;
        const strokes = await getStrokesBySelection(category, brand, model, cylinder);
        return res.json(strokes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt az ütemek lekérése során."
        });
    }
};

const showGenerationsBySelection = async (req, res) => {
    try {
        const { category, brand, model, cylinder, stroke } = req.params;
        const generations = await getGenerationsBySelection(category, brand, model, cylinder, stroke);
        return res.json(generations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt az évjáratok lekérése során."
        });
    }
};

const showCatalogBySelection = async (req, res) => {
    try {
        const { category, brand, model, cylinder, stroke, generation } = req.body;

        const catalog = await getCatalogBySelection({
            category,
            brand,
            model,
            cylinder,
            stroke,
            generation
        });

        if (!catalog) {
            return res.status(404).json({
                error: "Nincs ilyen motorváltozat a katalógusban."
            });
        }

        return res.json(catalog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt a katalógus rekord lekérése során."
        });
    }
};

const showCatalogById = async (req, res) => {
    try {
        const { id } = req.params;
        const catalog = await getCatalogById(id);

        if (!catalog) {
            return res.status(404).json({
                error: "A katalógus rekord nem található."
            });
        }

        return res.json(catalog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Hiba történt a katalógus rekord lekérése során."
        });
    }
};

export {
    showBrandsBySelection,
    showModelsBySelection,
    showCylindersBySelection,
    showStrokesBySelection,
    showGenerationsBySelection,
    showCatalogBySelection,
    showCatalogById
};
