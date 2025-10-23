// envoie la requete a la DB

import pool from "../config/db.js";

export const getAllCompanyService = async () => {
    const result = await pool.query("SELECT * FROM companies")
    return result.rows;
};
export const getCompanyByIdService = async (get_id) => {
    const result = await pool.query("SELECT * FROM companies where id = $1", [get_id]);
    return result.rows[0];
};
export const createCompanyService = async (name, description, website, location, tel, email) => {
    const result = await pool.query("INSERT INTO companies (name, description, website, location, tel, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [name, description, website, location, tel, email]);
    return result.rows[0];
};
export const updateCompanyService = async (id, name, description, website, location, tel, email) => {
    const result = await pool.query("UPDATE companies SET name=$1, description=$2, website=$3, location=$4, tel=$5, email=$6 WHERE id=$7 RETURNING *", [name, description, website, location, tel, email, id]);
    return result.rows[0];
};
export const deleteCompanyService = async (delete_id) => {
    const result = await pool.query("DELETE FROM companies where id = $1 RETURNING *", [delete_id]);
    return result.rows[0];
};