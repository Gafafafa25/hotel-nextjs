import 'server-only'
import {createHash, randomBytes} from "node:crypto";
import {pool} from "@/app/lib/db";
import {cookies} from "next/headers";

const COOKIE_NAME = 'admin_session'
const SESSION_SECONDS = 60 * 60 * 1000

type CurrentAdmin = {
    id: number,
    login: string,
    role: string
}

type AdminRow = CurrentAdmin


function hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex')
}

export async function createUser(login: string, password: string, role: string) {
    const result = await pool.query<AdminRow>(
        'INSERT INTO staff_users (login, password, role) ' +
        'VALUES ($1, crypt($2, gen_salt(\'bf\')), $3)', [login, password, role]
    )
    return result.rows[0]
}

export async function authenticateAdmin(login: string, password: string) {
    const result = await pool.query<AdminRow>(
        'SELECT id, login, role ' +
        'FROM staff_users ' +
        'WHERE login=$1 AND password=crypt($2, password)' +
        'AND is_active=true', [login, password]
    )
    return result.rows[0] ?? null
}

export async function createAdminSession(userId: number) {
    const token = randomBytes(32).toString('hex')
    const tokenHash = hashToken(token)
    const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000)
    await pool.query('INSERT INTO staff_sessions(token_hash, user_id, expires_at) VALUES ($1, $2, $3)', [tokenHash, userId, expiresAt])
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

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
    const token = (await cookies()).get(COOKIE_NAME)?.value
    if (!token) return null
    const result = await pool.query('SELECT users.id, users.login, users.role ' +
        'FROM staff_sessions AS sessions ' +
        'JOIN staff_users AS users ON users.id = sessions.user_id ' +
        'WHERE sessions.token_hash=$1 AND sessions.expires_at > NOW() ' +
        'AND users.is_active=true', [hashToken(token)]
    )
    return result.rows[0] ?? null
}

export async function deleteCurrentAdminSession(): Promise<void> {
    const cookie = await cookies()
    const token = cookie.get(COOKIE_NAME)?.value
    if (token) {
        await pool.query('DELETE FROM staff_sessions WHERE token_hash=$1', [hashToken(token)])
        cookie.delete(COOKIE_NAME)
    }
}

