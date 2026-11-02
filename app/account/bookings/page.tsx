import {getBookings} from "@/app/lib/account";
import {getCurrentGuest} from "@/app/lib/guest";
import BookingCard from "@/app/components/BookingCard";
import {getRoom, getRoomsByIds} from "@/app/lib/rooms";

export default async function bookingsPage() {
    const user = await getCurrentGuest()
    if (!user) {
        return (
            <div>Try later...</div>
        )
    }

    const bookings = await getBookings(user.id)
    const roomIds = bookings.map(b => b.room_id)

    // const bookings = await getBookings(user.id)
    // const room = await getRoom(bookings[0].room_id)

    const rooms = await getRoomsByIds(roomIds)
    const roomsMap = new Map(rooms.map(r => [r.id, r]))


    return (
        <main>
            <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">My bookings</h1>
                {/*<BookingCard checkIn={bookings[0].check_in} checkOut={bookings[0].check_out} roomName={room[0].name}/>*/}
                <div className="space-y-2 bg-gray-50 rounded-lg text-center">
                    {bookings.map((booking) => {
                        const room = roomsMap.get(booking.room_id)
                        return <BookingCard key={booking.id} checkIn={booking.check_in} checkOut={booking.check_out} roomName={room.name} />
                    })}
                </div>
            </section>
        </main>
    )
}