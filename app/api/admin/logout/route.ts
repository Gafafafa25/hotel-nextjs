import {deleteCurrentAdminSession} from "@/app/lib/admin-auth";
import {NextResponse} from "next/server";


export async function POST() {
    try {
        await deleteCurrentAdminSession()
    } catch {
        return NextResponse.json({status: 500, statusText: "Logout error"})
    }
    return NextResponse.json({ok: true})
}