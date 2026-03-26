import db from "../db/db.js";

async function createAppointmentService(appointment_id, service_id) {
    const sql = "INSERT INTO appointment_services(appointment_id, service_id) VALUES ($1, $2) RETURNING *";
    const result = await db.query(sql, [appointment_id, service_id]);
    return result.rows[0];
}

export {
    createAppointmentService
};
