import {deleteCurrentGuestSession} from "@/app/lib/guest";
import {NextResponse} from "next/server";

export async function POST() {
    try {
        await deleteCurrentGuestSession()
    } catch {
        return NextResponse.json({status: 400, statusText: "Internal Server Error1"})
    }
    return NextResponse.json({ok: true})
}