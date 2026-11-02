import {NextResponse} from "next/server";
import {getCurrentGuest} from "@/app/lib/guest";
import {addReservation} from "@/app/lib/book";

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

    if ( !("checkIn" in body) || !("checkOut" in body) || !("room" in body)) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error3"})
    }
    if (typeof body.checkIn !== "string" || typeof body.checkOut !== "string" || typeof body.room !== "string") {
        return NextResponse.json({status: 400, statusText: "Internal Server Error4"})
    }

    const guest = await getCurrentGuest()
    if (!guest) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error5"})
    }
    const bookId = await addReservation(Number(guest.id), Number(body.room), body.checkIn, body.checkOut)

    return NextResponse.json({bookId: bookId, guestName: guest.name, ok: true})
}