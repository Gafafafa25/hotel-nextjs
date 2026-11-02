"use client"

import {FormEvent, useState} from "react";
import {getTodayString} from "@/app/lib/search";
import {useRouter} from "next/navigation";


export default function BookingForm({check_in, check_out, room_id, room_name}:
                                        { check_in: string, check_out: string, room_id: string, room_name: string }) {


    const today = getTodayString()
    const emptyForm = {
        checkIn: check_in || "",
        checkOut: check_out || "",
        room: room_id || ""
    }
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")
    const router = useRouter()


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await fetch("api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()

        if (!data.ok) {
            setMessage("Reservation error")
        } else {
            const url = new URL('/booking/success', window.location.origin)
            url.searchParams.append('book_id', data.bookId)
            url.searchParams.append('check_in', check_in ? check_in : form.checkIn)
            url.searchParams.append('check_out', check_out ? check_out : form.checkOut)
            url.searchParams.append('name', data.guestName)
            url.searchParams.append('room', room_name)
            router.push(url.toString())
            setForm(emptyForm)
        }
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Booking <span
                    className="text-blue-600">{room_name}</span> room</h1>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="relative flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check in:
                            <input
                                type="date"
                                min={today}
                                value={form.checkIn}
                                onChange={(e) => {
                                    setForm({...form, checkIn: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>
                    </div>

                    <div className="relative flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check out:
                            <input
                                type="date"
                                min={form.checkIn || today}
                                value={form.checkOut}
                                onChange={(e) => {
                                    setForm({...form, checkOut: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white font-semibold
            rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        Book
                    </button>
                </form>
            </div>
        </main>
    )
}