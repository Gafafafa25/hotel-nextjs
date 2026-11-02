import {NextResponse} from "next/server";
import {addGuest} from "@/app/lib/guest";

export async function POST (request: Request) {
    console.log("+++")
    let body: unknown
    try {
        body = await request.json();
    }
    catch {
        return NextResponse.json({status: 400, statusText: "Internal Server Error1"})
    }
    if (body === null || typeof body !== 'object') {
        return NextResponse.json({status: 400, statusText: "Internal Server Error2"})
    }
    if(!("name" in body) || !("email" in body) || !("country" in body) || !("passport" in body) || !("password" in body)) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error3"})
    }
    if (typeof body.name !== "string" || typeof body.email !== "string" || typeof body.country !== "string"
        || typeof body.passport !== "string" || typeof body.password !== "string") {
        return NextResponse.json({status: 400, statusText: "Internal Server Error4"})
    }

    const user = addGuest(body.name, body.email, body.country, body.passport, body.password)
    if (!user) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error5"})
    }
    console.log(user, " user")
    // await createGuestSession(user.id)

    return NextResponse.json({ok: true})
}