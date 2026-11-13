import {getAllBookings} from "@/app/lib/admin-bookings";
import {getRooms} from "@/app/lib/rooms";
import BookingCard from "@/app/components/BookingCard";

export default async function BookingsList() {
    // const bookings = await getAllBookings()
    //
    // const rooms = await getRooms()
    // const roomsMap = new Map(rooms.map(r => [r.id, r]))

    return (
        <main>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">All Bookings</h1>
            {/*<div className="space-y-2 bg-gray-50 rounded-lg text-center">*/}
            {/*    {bookings.map((booking) => {*/}
            {/*        const room = roomsMap.get(booking.room_id)*/}
            {/*        return <BookingCard key={booking.id} checkIn={booking.check_in} checkOut={booking.check_out}*/}
            {/*                            roomName={room.name}/>*/}
            {/*    })}*/}
            {/*</div>*/}
        </main>
    )
}