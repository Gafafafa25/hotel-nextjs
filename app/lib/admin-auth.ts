import 'server-only'
import {createHash} from "node:crypto";

const COOKIE_NAME = 'admin_session'
const SESSION_SECONDS = 60 * 60 * 1000

type CurrentAdmin = {
    id : number,
    login: string,
     role: string
}

type AdminRow = CurrentAdmin


function hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex')
}

// export async function createUser(login: string, password: string, role: string) {
//     const result = await pool.query<AdminRow>(
//         'INSERT INTO '
//     )
// }