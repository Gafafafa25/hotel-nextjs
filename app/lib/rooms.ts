import {pool} from "@/app/lib/db";

export async function getRooms() {
    const result = await pool.query('SELECT * FROM rooms')
    return result.rows;
}