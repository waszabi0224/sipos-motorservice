import db from "../db/db.js";

async function getAllCategories() {
    const sql = `SELECT DISTINCT category FROM catalog ORDER BY category ASC`;
    const result = await db.query(sql);
    return result.rows;
}

async function getBrandsBySelection(category) {
    const sql = `SELECT DISTINCT brand FROM catalog WHERE category=$1 ORDER BY brand ASC`;
    const result = await db.query(sql, [category]);
    return result.rows;
}

async function getModelsBySelection(category, brand) {
    const sql = `SELECT DISTINCT model FROM catalog WHERE category=$1 AND brand=$2 ORDER BY model ASC`;
    const result = await db.query(sql, [category, brand]);
    return result.rows;
}

async function getCylindersBySelection(category, brand, model) {
    const sql = `SELECT DISTINCT cylinder FROM catalog WHERE category=$1 AND brand=$2 AND model=$3 ORDER BY cylinder ASC`;
    const result = await db.query(sql, [category, brand, model]);
    return result.rows;
}

async function getStrokesBySelection(category, brand, model, cylinder) {
    const sql = `SELECT DISTINCT stroke FROM catalog WHERE category=$1 AND brand=$2 AND model=$3 AND cylinder=$4
                 ORDER BY stroke ASC`;
    const result = await db.query(sql, [category, brand, model, cylinder]);
    return result.rows;
}

async function getGenerationsBySelection(category, brand, model, cylinder, stroke) {
    const sql = `SELECT DISTINCT generation FROM catalog WHERE category=$1 AND brand=$2 AND model=$3
                 AND cylinder=$4 AND stroke=$5 ORDER BY generation DESC`;
    const result = await db.query(sql, [category, brand, model, cylinder, stroke]);
    return result.rows;
}

async function getCatalogBySelection({ category, brand, model, cylinder, stroke, generation }) {
    const sql = `SELECT * FROM catalog WHERE category=$1 AND brand=$2 AND model=$3 AND cylinder=$4
                 AND stroke=$5 AND generation=$6 LIMIT 1`;
    const result = await db.query(sql, [category, brand, model, cylinder, stroke, generation]);
    return result.rows[0];
}

async function getCatalogById(id) {
    const sql = `SELECT * FROM catalog WHERE id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

export {
    getAllCategories,
    getBrandsBySelection,
    getModelsBySelection,
    getCylindersBySelection,
    getStrokesBySelection,
    getGenerationsBySelection,
    getCatalogBySelection,
    getCatalogById
};
