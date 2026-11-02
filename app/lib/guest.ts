import {pool} from "@/app/lib/db";
import {createHash, randomBytes} from "node:crypto";
import {cookies} from "next/headers";


const COOKIE_NAME = 'guest_session'
const SESSION_SECONDS = 60 * 60 * 1000

type currentGuest = {
    id: number,
    email: string,
    name: string
}

function hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex')
}

export async function hasGuest(name: string, passport: string) {
    const result = await pool.query('' +
        'SELECT id FROM guests WHERE name=$1 AND passport=$2', [name, passport]
    )
    return result.rows[0]?.id
}

// export async function addGuest(name: string, email: string, country: string, passport: string) {
//     const result = await pool.query('' +
//         'INSERT INTO guests (name, email, country, passport) ' +
//         'VALUES ($1, $2, $3, $4) ' +
//         'RETURNING id', [name, email, country, passport]
//     )
//     return result.rows[0].id
// }

export async function addGuest(name: string, email: string, country: string, passport: string, password: string) {
    const result = await pool.query('' +
        'INSERT INTO guests (name, email, country, passport, password) ' +
        'VALUES ($1, $2, $3, $4, crypt($5, gen_salt(\'bf\'))) ' +
        'RETURNING id', [name, email, country, passport, password]
    )
    return result.rows[0].id
}

export async function authenticateGuest(email: string, password: string) {
    const result = await pool.query('' +
        'SELECT id, name FROM guests ' +
        'WHERE email=$1 AND password=crypt($2, password)', [email, password]
    )
    return result.rows[0]
}

export async function createGuestSession(userId: number) {
    const token = randomBytes(32).toString('hex')
    const token_hash = hashToken(token)
    const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000)
    await pool.query('INSERT INTO guests_sessions VALUES($1, $2, $3)', [token_hash, userId, expiresAt])
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_SECONDS,
        expires: expiresAt
    })
}

export async function getCurrentGuest(): Promise<currentGuest | null> {
    const token = (await cookies()).get(COOKIE_NAME)?.value
    if (!token) return null
    const result = await pool.query('SELECT guests.id, guests.email, guests.name ' +
        'FROM guests_sessions AS sessions ' +
        'JOIN guests ON guests.id = sessions.user_id ' +
        'WHERE sessions.token_hash=$1 AND sessions.expires_at > NOW()', [hashToken(token)]
    )
    return result.rows[0] ?? null
}

export async function deleteCurrentGuestSession(): Promise<void> {
    const cookie = await cookies()
    const token = cookie.get(COOKIE_NAME)?.value
    if (token) {
        await pool.query('DELETE FROM guests WHERE token_hash=$1', [hashToken(token)])
        cookie.delete(COOKIE_NAME)
    }
}
