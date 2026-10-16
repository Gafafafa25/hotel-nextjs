import {pool} from "@/app/lib/db";

export async function getRooms() {
    const result = await pool.query('SELECT * FROM rooms')
    return result.rows;
}

export async function getAvailableRooms(checkIn: string, checkOut: string, guests: number) {
    const result = await pool.query(
        'SELECT r.* ' +
        'FROM rooms r ' +
        'LEFT JOIN reservations res ' +
        'ON r.id = res.room_id ' +
        'AND res.check_in < $2::date ' +
        'AND res.check_out > $1::date ' +
        'WHERE res.id IS NULL ' +
        'AND r.max_guests >= $3' , [checkIn, checkOut, guests]
    )
    return result.rows;
}

export async function getRoomsByIds(room_ids: number[]) {
    const result = await pool.query(
        'SELECT * FROM rooms ' +
        'WHERE rooms.id = ANY($1)', [room_ids]
    )
    return result.rows;
}
