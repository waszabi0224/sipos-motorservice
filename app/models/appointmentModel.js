import db from "../db/db.js";

async function createAppointment(appointment) {
    const sql = "INSERT INTO appointments(user_id, appointment_date, appointment_time, vehicle_brand, vehicle_type, license_plate, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const result = await db.query(sql, [appointment.user_id, appointment.appointment_date, appointment.appointment_time, appointment.vehicle_brand, appointment.vehicle_type, appointment.license_plate, appointment.note]);
    return result.rows[0];
}

async function getAllAppointments() {
    const sql = `SELECT a.id, a.appointment_date, a.appointment_time, a.vehicle_brand,
                    a.vehicle_type, a.license_plate, a.note, a.created_at, a.status,
                    users.email, users.first_name, users.last_name,
                    STRING_AGG(services.name, ', ') AS services
                 FROM appointments a
                 JOIN appointment_services aps ON a.id = aps.appointment_id
                 JOIN services ON aps.service_id = services.id
                 JOIN users ON a.user_id = users.id
                 GROUP BY a.id, users.email, users.first_name, users.last_name
                 ORDER BY a.appointment_date, a.appointment_time`;
    const result = await db.query(sql);
    return result.rows;
}

async function getAppointmentsByUserId(userId) {
    const sql = `SELECT a.id, a.appointment_date, a.appointment_time, a.vehicle_brand, 
                    a.vehicle_type, a.license_plate, a.note, a.created_at, a.status, 
                    STRING_AGG(services.name, ', ') AS services
                 FROM appointments a
                 JOIN appointment_services aps ON a.id = aps.appointment_id
                 JOIN services ON aps.service_id = services.id
                 WHERE a.user_id=$1
                 GROUP BY a.id
                 ORDER BY a.appointment_date, a.appointment_time`;
    const result = await db.query(sql, [userId]);
    return result.rows;
}

async function getAppointmentById(id) {
    const sql = "SELECT * FROM appointments WHERE id=$1";
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

async function updateAppointment(id, updatedAppointment) {
    const sql = "UPDATE appointments SET status=$1 WHERE id=$2 RETURNING *";
    const result = await db.query(sql, [updatedAppointment.status, id]);
    return result.rows[0];
}

export {
    createAppointment,
    getAllAppointments,
    getAppointmentsByUserId,
    getAppointmentById,
    updateAppointment
};
