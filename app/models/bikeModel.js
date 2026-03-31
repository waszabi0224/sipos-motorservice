import db from "../db/db.js";

async function createBike(bike) {
    const sql = `INSERT INTO bikes (user_id, catalog_id) VALUES ($1, $2) RETURNING *`;
    const result = await db.query(sql, [bike.user_id, bike.catalog_id]);
    return result.rows[0];
}

async function getBikeByUserId(userId) {
    const sql = `SELECT b.id, b.user_id, b.catalog_id, b.created_at, c.category, c.brand,
                 c.model, c.cylinder, c.stroke, c.generation
                 FROM bikes b
                 JOIN catalog c ON b.catalog_id = c.id
                 WHERE b.user_id=$1
                 ORDER BY b.created_at DESC`;
    const result = await db.query(sql, [userId]);
    return result.rows;
}

async function getBikeById(id) {
    const sql = `SELECT b.id, b.user_id, b.catalog_id, b.created_at, c.category,
                 c.brand, c.model, c.cylinder, c.stroke, c.generation
                 FROM bikes b
                 JOIN catalog c ON b.catalog_id = c.id
                 WHERE b.id=$1
                 LIMIT 1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function getServiceByBikeId(bikeId) {
    const sql = `SELECT a.id AS appointment_id, a.appointment_date, a.appointment_time, a.status,
                 a.note, s.id AS service_id, s.name, s.description, s.price, s.duration
                 FROM appointments a
                 JOIN appointment_services aps ON a.id = aps.appointment_id
                 JOIN services s ON aps.service_id = s.id
                 WHERE a.bike_id = $1
                 ORDER BY a.appointment_date, a.appointment_time, s.name`;
    const result = await db.query(sql, [bikeId]);
    return result.rows;
}

async function updateBike(id, updatedBike) {
    const sql = `UPDATE bikes SET catalog_id=$1 WHERE id=$2 RETURNING *`;
    const result = await db.query(sql, [updatedBike.catalog_id, id]);
    return result.rows[0];
}

async function deleteBike(id) {
    const sql = `DELETE FROM bikes WHERE id=$1 RETURNING *`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

export {
    createBike,
    getBikeByUserId,
    getBikeById,
    getServiceByBikeId,
    updateBike,
    deleteBike
};
