import db from "../db/db.js";

async function createService(service) {
    const sql = "INSERT INTO services(name, description, price, duration, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await db.query(sql, [service.name, service.description, service.price, service.duration, service.is_active]);
    return result.rows[0];

}

async function getAllServices() {
    const sql = "SELECT * FROM services ORDER BY created_at DESC";
    const result = await db.query(sql);
    return result.rows;
}

async function getServiceById(id) {
    const sql = "SELECT * FROM services WHERE id=$1";
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function updateService(id, updatedService) {
    const sql = "UPDATE services SET name=$1, description=$2, price=$3, duration=$4, is_active=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *";
    const result = await db.query(sql, [updatedService.name, updatedService.description, updatedService.price, updatedService.duration, updatedService.is_active, id]);
    return result.rows[0];
}

async function deleteService(id) {
    const sql = "DELETE FROM services WHERE id=$1";
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function getActiveServices() {
    const sql = "SELECT * FROM services WHERE is_active=true ORDER BY created_at DESC";
    const result = await db.query(sql);
    return result.rows;
}

export {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    getActiveServices
};
