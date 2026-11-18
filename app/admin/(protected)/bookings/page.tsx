import {getAllBookings, getAllGuests, getAllGuestsNames} from "@/app/lib/admin-bookings";
import {getRooms, getRoomsByIds} from "@/app/lib/rooms";
import BookingCard from "@/app/components/BookingCard";


export default async function allBookingsPage() {
    const bookings = await getAllBookings()

    // getRoomsByIds ??
    const rooms = await getRooms()
    const roomsMap = new Map(rooms.map(r => [r.id, r]))

    const guests = await getAllGuestsNames()
    const guestsMap = new Map(guests.map(g => [Number(g.id), g]))

    return (
        <main>
            <section className="max-w-4xl mx-auto py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">All Bookings</h1>
                <div className="space-y-2 bg-gray-50 rounded-lg text-center">
                    {bookings.map((booking) => {
                        const room = roomsMap.get(booking.room_id)
                        const guest = guestsMap.get(booking.guest_id)
                        return <BookingCard key={booking.id} name={guest.name} checkIn={booking.check_in}
                                            checkOut={booking.check_out}
                                            roomName={room.name}
                                            booked={booking.created_at}/>
                    })}
                </div>
            </section>
        </main>
    )
}