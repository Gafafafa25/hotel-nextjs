import {pool} from "@/app/lib/db";

export async function getAllBookings() {
    const result = await pool.query('SELECT * FROM reservations')
    return result.rows
}

export async function getAllGuests() {
    const result = await pool.query('SELECT * FROM guests')
    return result.rows
}

export async function getAllGuestsNames() {
    const result = await pool.query('SELECT id, name FROM guests')
    return result.rows
}