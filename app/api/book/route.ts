import {NextResponse} from "next/server";
import {addGuest, hasGuest} from "@/app/lib/guest";
import addReservation from "@/app/lib/book";

export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({status: 400, statusText: "Internal Server Error1"})
    }
    if (body === null || typeof body !== 'object') {
        return NextResponse.json({status: 400, statusText: "Internal Server Error2"})
    }
    if (!("name" in body) || !("email" in body) || !("country" in body) || !("passport" in body) || !("checkIn" in body)
        || !("checkOut" in body) || !("room" in body)) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error3"})
    }
    if (typeof body.name !== "string" || typeof body.email !== "string" || typeof body.country !== "string"
        || typeof body.passport !== "string" || typeof body.checkIn !== "string" || typeof body.checkOut !== "string"
        || typeof body.room !== "string") {
        return NextResponse.json({status: 400, statusText: "Internal Server Error4"})
    }

    let guest = await hasGuest(body.name, body.passport)
    if (!guest) {
        guest = await addGuest(body.name, body.email, body.country, body.passport)
    }
    await addReservation(Number(guest), Number(body.room), body.checkIn, body.checkOut)

    return NextResponse.json({guest: guest, ok: true})
}