import db from "../db/db.js";

async function createAppointment(appointment) {
    const sql = "INSERT INTO appointments(user_id, bike_id, appointment_date, appointment_time, catalog_id, note, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const result = await db.query(sql, [appointment.user_id, appointment.bike_id, appointment.appointment_date, appointment.appointment_time, appointment.catalog_id, appointment.note, appointment.status]);
    return result.rows[0];
}

async function getAllAppointments() {
    const sql = `SELECT a.id, a.appointment_date, a.appointment_time, c.category, c.brand, c.model,
                    c.cylinder, c.stroke, c.generation, a.created_at, a.note, a.status,
                    a.created_at, users.email, users.first_name, users.last_name,
                    STRING_AGG(services.name, ', ') AS services
                 FROM appointments a
                 JOIN appointment_services aps ON a.id = aps.appointment_id
                 JOIN services ON aps.service_id = services.id
                 JOIN users ON a.user_id = users.id
                 JOIN catalog c ON a.catalog_id = c.id
                 GROUP BY a.id, users.email, users.first_name, users.last_name, c.category, c.brand, c.model,
                    c.cylinder, c.stroke, c.generation
                 ORDER BY a.appointment_date, a.appointment_time`;
    const result = await db.query(sql);
    return result.rows;
}

async function getAppointmentByUserId(userId) {
    const sql = `SELECT a.id, a.appointment_date, a.appointment_time, a.note, a.status,
                    c.category, c.brand, c.model, c.cylinder, c.stroke, c.generation, a.created_at, 
                    STRING_AGG(services.name, ', ') AS services
                 FROM appointments a
                 JOIN appointment_services aps ON a.id = aps.appointment_id
                 JOIN services ON aps.service_id = services.id
                 JOIN catalog c ON a.catalog_id = c.id
                 WHERE a.user_id=$1
                 GROUP BY a.id, c.category, c.brand, c.model, c.cylinder, c.stroke, c.generation
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
