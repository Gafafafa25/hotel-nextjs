'use client'

import {useEffect, useState} from 'react'
import {getTodayString} from "@/app/lib/search";
import {makeGetServerInsertedHTML} from "next/dist/server/app-render/make-get-server-inserted-html";


export default function SearchForm() {
    const today = getTodayString()
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState('')
    const [error, setError] = useState('')

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <main className="px-4 py-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200  ">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <div className="relative flex-1">
                        <label htmlFor="checkIn">Check‑in date</label>
                        <input
                            type="date"
                            id="checkIn"
                            min={today}
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="relative flex-1">
                        <label htmlFor="checkOut">Check-out date</label>
                        <input
                            type="date"
                            id="checkOut"
                            min={checkIn || today}
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="relative flex-1">
                        <label htmlFor="guests">Guests</label>
                        <select id="guests"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                        >
                            {/*{[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}*/}
                            <option value={1}>1 guest</option>
                            <option value={2}>2 guests</option>
                            <option value={3}>3 guests</option>
                            <option value={4}>4 guests</option>
                            <option value={5}>5+ guests</option>
                        </select>
                    </div>
                    {error && <p>{error}</p>}


                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-blue-500/30 text-sm flex items-center justify-center gap-2"
                    >Find Rooms
                    </button>

                    {/*{error && <p>{error}</p>}*/}

                    {/*<button type="submit">Find Rooms</button>*/}
                </form>
            </div>
        </main>
    )
}