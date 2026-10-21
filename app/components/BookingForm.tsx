"use client"

import {FormEvent, useEffect, useState} from "react";
import {getTodayString} from "@/app/lib/search";
import Image from "next/image";
import {useSearchParams} from "next/navigation";

// const emptyForm = {
//     name: "",
//     email: "",
//     checkIn: "",
//     checkOut: "",
//     room: ""
// }

export default function BookingForm({check_in, check_out, room_id, room_name}:
                                        { check_in: string, check_out: string, room_id: string, room_name: string }) {
// {check_in?: string, check_out?: string, room_id?: string, room_name: string}) {


    const today = getTodayString()
    const emptyForm = {
        name: "",
        email: "",
        country: "",
        passport: "",
        checkIn: check_in || "",
        checkOut: check_out || "",
        room: room_id || ""
    }
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")


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
            alert("Reservation ok")
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name:
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => {
                                    setForm({...form, name: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>
                    </div>

                    <div className="relative flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email:
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => {
                                    setForm({...form, email: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>
                    </div>

                    <div className="relative flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country:
                            <input
                                type="text"
                                value={form.country}
                                onChange={(e) => {
                                    setForm({...form, country: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>
                    </div>

                    <div className="relative flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passport:
                            <input
                                type="text"
                                value={form.passport}
                                onChange={(e) => {
                                    setForm({...form, passport: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>
                    </div>

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