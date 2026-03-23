import db from "../db/db.js";

async function findUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=$1";
    const result = await db.query(sql, [email]);
    return result.rows[0];
}

async function createUser(user) {
    const sql = "INSERT INTO users( first_name, last_name, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await db.query(sql, [user.first_name, user.last_name, user.email, user.password, user.phone]);
    return result.rows[0];
}

export {
    findUserByEmail,
    createUser
};