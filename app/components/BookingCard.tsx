"use client"


export default function BookingCard({name, checkIn, checkOut, roomName, booked}: {
    name?: string,
    checkIn: string,
    checkOut: string,
    roomName: string,
    booked: string
}) {
    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

    const nights = Math.max(1, Math.round(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    ))

    return (
        <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between gap-3 items-start">
                <h2 className="font-bold text-lg">Room: {roomName}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    {name ?? (<span>{name}</span>)}
                    <span>{formatDate(checkIn)} — {formatDate(checkOut)}</span>
                    <span>Booked on {formatDate(booked)}</span>
                    <span>Nights {nights}</span>
                    <span>Фото</span>
                </div>
            </div>
        </div>
    )
}