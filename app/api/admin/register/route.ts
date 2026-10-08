import {NextResponse} from "next/server";
import {createUser} from "@/app/lib/admin-auth";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json()
    } catch {
        return NextResponse.json({status: 500, statusText: "Internal Server Error1"})
    }

    if (body === null || typeof body !== 'object') {
        return NextResponse.json({status: 400, statusText: "Internal Server Error2"})
    }
    if (!("login" in body) || !("password" in body) || !("role" in body)) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error3"})
    }
    if (typeof body.login !== "string" || typeof body.password !== "string" || typeof body.role !== "string") {
        return NextResponse.json({status: 400, statusText: "Internal Server Error4"})
    }

    const user = await createUser(body.login, body.password, body.role)
    // console.log(user, "user")
    console.log(body.login, body.password, body.role, "user")
    if (!user) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error5"})
    }
    return NextResponse.json({login: user.login, role: user.role, ok: true})
}