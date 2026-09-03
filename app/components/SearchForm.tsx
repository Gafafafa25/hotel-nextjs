'use client'

import {useState} from 'react'
import {getTodayString} from "@/app/lib/search";


export default function SearchForm() {
    const today = getTodayString()
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState('')
    const [error, setError] = useState('')

    if (!checkIn || !checkOut) {
        setError('Select the check‑in and check‑out dates')
        return
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
        setError('Incorrect date interval')
    }

    setError('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="checkIn">Check‑in date</label>
                    <input
                        type="date"
                        id="checkIn"
                        min={today}
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="checkOut">Check-out date</label>
                    <input
                        type="date"
                        id="checkOut"
                        min={checkIn || today}
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="guests">Guests</label>
                    <select id="guests"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                    >
                        <option value={1}>1 guest</option>
                        <option value={2}>2 guests</option>
                        <option value={3}>3 guests</option>
                        <option value={4}>4 guests</option>
                        <option value={5}>5+ guests</option>
                    </select>
                </div>
            </div>

            {error && <p>{error}</p>}

            <button type="submit">Find Rooms</button>
        </form>
    )
}