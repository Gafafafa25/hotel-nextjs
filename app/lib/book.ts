import {pool} from "@/app/lib/db";

export default async function addReservation(guest_id: number, room_id: number, check_in: string, check_out: string) {
    const result = await pool.query('' +
        'INSERT INTO reservations (guest_id, room_id, check_in, check_out) ' +
        'VALUES ($1, $2, $3, $4)', [guest_id, room_id, check_in, check_out]);
    return result.rows[0];
}