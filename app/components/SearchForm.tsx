"use client"

import {FormEvent, useEffect, useState} from 'react'
import {getTodayString} from "@/app/lib/search";
import {useRouter} from "next/navigation";
import {Room} from "@/app/types/room";

const emptyForm = {
    checkIn: "",
    checkOut: "",
    guests: 1
}

export default function SearchForm() {
    const today = getTodayString()
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")
    const router = useRouter()


    // if (!checkIn || !checkOut) {
    //     setError('Select the check‑in and check‑out dates')
    //     return
    // }
    //
    // if (new Date(checkOut) <= new Date(checkIn)) {
    //     setError('Incorrect date interval')
    // }
    //
    // setError('')

    // useEffect(() => {
    //     if (!checkIn || !checkOut) {
    //         setError('Select the check‑in and check‑out dates')
    //         return
    //     }
    //
    //     if (new Date(checkOut) <= new Date(checkIn)) {
    //         setError('Incorrect date interval')
    //     }
    // }, [checkIn, checkOut])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // const params = new URLSearchParams({
        //     check_in: form.checkIn,
        //     check_out: form.checkOut,
        //     guests: String(form.guests)
        // })

        const url = new URL('/api/search', window.location.origin)
        url.searchParams.set('check_in', form.checkIn);
        url.searchParams.set('check_out', form.checkOut);
        url.searchParams.set('guests', String(form.guests));

        const res = await fetch(url.toString())
        const data = await res.json()

        // const response = await fetch(`/api/search?${params.toString()}`, {method: 'GET'})

        // const data = await response.json()
        // console.log(data.data, " data")

        const ids = data.data.map((room: Room) => room.id)

        if (!data.ok) {
            setMessage("Search error")
        }

        const urlResults = new URL('/search', window.location.origin)
        ids.forEach((id: string) => urlResults.searchParams.append('ids', id))
        urlResults.searchParams.append('check_in', form.checkIn)
        urlResults.searchParams.append('check_out', form.checkOut)
        urlResults.searchParams.append('guests', String(form.guests))
        router.push(urlResults.toString())

        // router.push(`/server-page?items=${encodeURIComponent(param)}`)

        // router.push({
        //     pathname: '/search',
        //     query: {
        //        rooms: '234'
        //     }
        // })

        router.refresh()

    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <div className="relative flex-1">
                        <label htmlFor="checkIn">Check‑in date</label>
                        <input
                            type="date"
                            id="checkIn"
                            min={today}
                            value={form.checkIn}
                            onChange={(e) => setForm({...form, checkIn: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="relative flex-1">
                        <label htmlFor="checkOut" >Check-out date</label>
                        <input
                            type="date"
                            id="checkOut"
                            min={form.checkIn || today}
                            value={form.checkOut}
                            onChange={(e) => setForm({...form, checkOut: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="relative flex-1">
                        <label htmlFor="guests">Guests</label>
                        <select id="guests"
                                value={form.guests}
                                onChange={(e) => setForm({...form, guests: Number(e.target.value)})}
                                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                        >
                            <option value={1}>1 guest</option>
                            <option value={2}>2 guests</option>
                            <option value={3}>3 guests</option>
                            <option value={4}>4 guests</option>
                            <option value={5}>5+ guests</option>
                        </select>
                    </div>
                    {message && <p>{message}</p>}


                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-blue-500/30 text-sm flex items-center justify-center gap-2"
                    >Find Rooms
                    </button>
                </form>
            </div>
        </main>
    )
}