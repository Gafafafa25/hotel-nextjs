import {pool} from "@/app/lib/db";

export async function getBookings(userId: number) {
    const result = await pool.query('SELECT * FROM reservations WHERE guest_id = $1', [userId])
    return result.rows
}