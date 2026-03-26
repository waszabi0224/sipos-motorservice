import db from "../db/db.js";

async function createAppointment(appointment) {
    const sql = "INSERT INTO appointments(user_id, appointment_date, appointment_time, vehicle_brand, vehicle_type, license_plate, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const result = await db.query(sql, [appointment.user_id, appointment.appointment_date, appointment.appointment_time, appointment.vehicle_brand, appointment.vehicle_type, appointment.license_plate, appointment.note]);
    return result.rows[0];
}

async function getAllAppointments() {
    const sql = "SELECT * FROM appointments ORDER BY created_at DESC";
    const result = await db.query(sql);
    return result.rows;
}

async function getAppointmentsByUserId(userId) {
    const sql = "SELECT * FROM appointments WHERE user_id=$1";
    const result = await db.query(sql, [userId]);
    return result.rows;
}

async function getAppointmentById(id) {
    const sql = "SELECT * FROM appointments WHERE id=$1";
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

export {
    createAppointment,
    getAllAppointments,
    getAppointmentsByUserId,
    getAppointmentById
};
