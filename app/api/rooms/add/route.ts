import {NextResponse} from "next/server";
import {addRoom} from "@/app/lib/rooms";
import {Room} from "@/app/types/room";

export async function POST(request: Request) {
    let body: unknown;
    // let body: Room;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({status: 400, statusText: "Internal Server Error1"})
    }


    if (body === null || typeof body !== 'object') {
        return NextResponse.json({status: 400, statusText: "Internal Server Error2"}
        )
    }

    if (!("room_number" in body) || !("name" in body) || !("description" in body) || !("price" in body)
        || !("maxGuests" in body) || !("image" in body) || !("amenities" in body)) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error3"}
        )
    }

    if (typeof body.room_number !== "string" || typeof body.name !== "string"
        || typeof body.description !== "string" || typeof body.price !== "number" || typeof body.maxGuests !== "number"
        || !(Array.isArray(body.image) || !(Array.isArray(body.amenities)) || !(body.image.every((img) => typeof img === "string")))
        // || typeof body.image !== "string" || !(Array.isArray(body.amenities))
        || !(body.amenities.every((amenity) => typeof amenity === "string"))) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error4"})
    }

    const room = await addRoom(body.room_number, body.name, body.description, body.price, body.maxGuests,
        body.image, body.amenities)

    if (!room) {
        return NextResponse.json({status: 400, statusText: "Internal Server Error5"})
    }
    return NextResponse.json({roomId: room.id, roomName: room.name, ok: true})
}