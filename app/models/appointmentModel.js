import db from "../db/db.js";

async function createAppointment(appointment) {
    const sql = "INSERT INTO appointments(user_id, bike_id, appointment_date, appointment_time, bike_brand, bike_model, bike_type, bike_category, bike_stroke, bike_cylinder, bike_generation, note, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *";
    const result = await db.query(sql, [appointment.user_id, appointment.bike_id, appointment.appointment_date, appointment.appointment_time, appointment.bike_brand, appointment.bike_model, appointment.bike_type, appointment.bike_category, appointment.bike_stroke, appointment.bike_cylinder, appointment.bike_generation, appointment.note, appointment.status]);
    return result.rows[0];
}

async function getAllAppointments() {
    const sql = `SELECT a.id, a.appointment_date, a.appointment_time, a.bike_brand, a.bike_model, a.bike_type,
                    a.bike_category, a.bike_stroke, a.bike_cylinder, a.bike_generation, a.note, a.status,
                    a.created_at, users.email, users.first_name, users.last_name,
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

async function getAppointmentByUserId(userId) {
    const sql = `SELECT a.id, a.appointment_date, a.appointment_time, a.bike_brand, a.bike_model, a.bike_type,
                    a.bike_category, a.bike_stroke, a.bike_cylinder, a.bike_generation, a.note, a.status,
                    a.created_at, 
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
    getAppointmentByUserId,
    getAppointmentById,
    updateAppointment
};
