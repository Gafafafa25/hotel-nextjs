import {pool} from "@/app/lib/db";

export async function hasGuest(name: string, passport: string) {
    const result = await pool.query('' +
        'SELECT id FROM guests WHERE name=$1 AND email=$2', [name, passport]
    )
    return result.rows[0]?.id
}

export async function addGuest(name: string, email: string, country: string, passport: string) {
    const result = await pool.query('' +
        'INSERT INTO guests (name, email, country, passport) ' +
        'VALUES ($1, $2, $3, $4) ' +
        'RETURNING id', [name, email, country, passport]
    )
    return result.rows[0].id
}