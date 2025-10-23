// envoie la requete a la DB

import pool from "../config/db.js";

export const getAllUsersService = async () => {npm
    const result = await pool.query("SELECT * FROM users")
    return result.rows;
};
export const getUserByIdService = async (get_id) => {
    const result = await pool.query("SELECT * FROM users where id = $1", [get_id]);
    return result.rows[0];
};
export const createUserService = async (first_name, last_name, email, password) => {
    const result = await pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [first_name, last_name, email, password]);
    return result.rows[0];
};
export const updateUserService = async (id, first_name, last_name, email, password) => {
    const result = await pool.query("UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4 WHERE id=$5 RETURNING *", [first_name, last_name, email, password, id]);
    return result.rows[0];
};
export const deleteUserService = async (delete_id) => {
    const result = await pool.query("DELETE FROM users where id = $1 RETURNING *", [delete_id]);
    return result.rows[0];
};