'use client'

import {useEffect, useState} from 'react'
import {getTodayString} from "@/app/lib/search";


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
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold
                    py-4 px-8 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transform active:scale-[0.98]
                     transition-all text-lg"
                    >Find Rooms
                    </button>
                </div>

                {/*{error && <p>{error}</p>}*/}

                {/*<button type="submit">Find Rooms</button>*/}
        </form>
)
}