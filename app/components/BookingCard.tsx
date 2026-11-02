"use client"

// export default function BookingCard({checkIn, checkOut, roomName}: { checkIn: string, checkOut: string, roomName: string }) {
export default function BookingCard({checkIn, checkOut, roomName}: { checkIn: string, checkOut: string, roomName: string }) {
    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

    return (
        <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between gap-3 items-start">
                <h2 className="font-bold text-lg">Room: {roomName}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    <span>{formatDate(checkIn)} — {formatDate(checkOut)}</span>
                    <span>Дата бронирования</span>
                    <span>Кол-во ночей</span>
                    <span>Фото</span>
                </div>
            </div>
        </div>
    )
}