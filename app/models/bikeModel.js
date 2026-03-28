import db from "../db/db.js";

async function createBike(bike) {
    const sql = "INSERT INTO bikes(user_id, brand, model, type, category, stroke, cylinder, generation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const result = await db.query(sql, [bike.user_id, bike.brand, bike.model, bike.type, bike.category, bike.stroke, bike.cylinder, bike.generation]);
    return result.rows[0];
}

async function getBikeByUserId(userId) {
    const sql = "SELECT * FROM bikes WHERE user_id=$1";
    const result = await db.query(sql, [userId]);
    return result.rows;
}

async function updateBike(id, updatedBike) {
    const sql = "UPDATE bikes SET brand=$1, model=$2, type=$3, category=$4, stroke=$5, cylinder=$6, generation=$7, updated_at=CURRENT_TIMESTAMP WHERE id=$8 RETURNING *";
    const result = await db.query(sql, [updatedBike.brand, updatedBike.model, updatedBike.type, updatedBike.category, updatedBike.stroke, updatedBike.cylinder, updatedBike.generation, id]);
    return result.rows[0];
}

async function deleteBike(id) {
    const sql = "DELETE FROM bikes WHERE id=$1";
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

export {
    createBike,
    getBikeByUserId,
    updateBike,
    deleteBike
};
