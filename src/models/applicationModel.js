// envoie la requete a la DB

import pool from "../config/db.js";

export const getAllApplicationService = async () => {
    const result = await pool.query("SELECT * FROM application")
    return result.rows;
};
export const getApplicationByIdService = async (get_id) => {
    const result = await pool.query("SELECT * FROM application where id = $1", [get_id]);
    return result.rows[0];
};

export const createApplicationService = async (applicant_id, advertissement_id, status) => {
    const result = await pool.query("INSERT INTO application (applicant_id, advertissement_id, status) VALUES ($1, $2, $3) RETURNING *", [applicant_id, advertissement_id, status]);
    return result.rows[0];
};
export const updateApplicationService = async (id, applicant_id, advertissement_id, status) => {
    const result = await pool.query("UPDATE application SET applicant_id=$1, advertissement_id=$2, status=$3 WHERE id=$4 RETURNING *", [applicant_id, advertissement_id, status, id]);
    return result.rows[0];
};
export const deleteApplicationService = async (delete_id) => {
    const result = await pool.query("DELETE FROM application where id = $1 RETURNING *", [delete_id]);
    return result.rows[0];
};