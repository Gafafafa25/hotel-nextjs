import {NextRequest, NextResponse} from "next/server";
// import {getAvailableRooms} from "@/app/lib/search";
import {getAvailableRooms} from "@/app/lib/rooms";


export async function GET(request: Request) {
    let check_in, check_out, guests
    try {
        const {searchParams} = new URL(request.url)
        check_in = searchParams.get('check_in')
        check_out = searchParams.get('check_out')
        guests = searchParams.get('guests')


        if (!check_in || !check_out || !guests) {
            return NextResponse.json({status: 400, statusText: "Invalid Request1"})
        }

        const rooms = await getAvailableRooms(check_in, check_out, Number(guests))

        if (!rooms) {
            return NextResponse.json({status: 400, statusText: "Internal Server Error2"})
        }

        return NextResponse.json({data: rooms, ok: true})

    } catch {
        return NextResponse.json({status: 400, statusText: "Invalid Request3"})
    }
}