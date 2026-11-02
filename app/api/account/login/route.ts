import {NextResponse} from "next/server";
import {authenticateGuest, createGuestSession} from "@/app/lib/guest";

export async function POST(request: Request) {
    let body: unknown

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({status: 500, statusText: "Internal Server Error1"})
    }

    if (body === null || typeof body !== 'object') {
        return NextResponse.json({status: 400, statusText: "Internal Server Error2"})
    }
    if (!("email" in body) || !("password" in body)) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error3"})
    }
    if (typeof body.email !== "string" || typeof body.password !== "string") {
        return NextResponse.json({status: 400, statusText: "Internal Server Error4"})
    }

    const user = await authenticateGuest(body.email, body.password)

    if (!user) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error5"})
    }

    await createGuestSession(user.id)

    return NextResponse.json({email: body.email, ok: true})
}