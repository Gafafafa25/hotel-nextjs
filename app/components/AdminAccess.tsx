"use client"

import {useState} from "react";
import RegisterForm from "@/app/components/RegisterForm";
import RoomForm from "@/app/components/RoomForm";
// import BookingsList from "@/app/components/BookingsList";
// import Link from "next/link";


export default function AdminAccess() {
    const [showRegisterForm, setShowRegisterForm] = useState(true)
    const [showRooms, setShowRooms] = useState(false)
    const [showBookings, setShowBookings] = useState(false)

    return (
        <main>
            <div className="flex items-center justify-between bg-white">
                <button
                    type="button"
                    onClick={() => {
                        setShowRegisterForm(!showRegisterForm)
                        setShowRooms(false)
                        setShowBookings(false)
                    }}>Add user
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowRooms(!showRooms)
                        setShowRegisterForm(false)
                        setShowBookings(false)
                    }}>Add room
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowBookings(!showBookings)
                        setShowRegisterForm(false)
                        setShowRooms(false)
                    }}
                >
                    Bookings
                </button>
            </div>
            <div>
                {showRegisterForm && (
                    <RegisterForm/>
                )}
                {showRooms && (
                    <RoomForm/>
                )}
                {/*{showBookings && (*/}
                {/*    <BookingsList/>*/}
                {/*)}*/}
            </div>
        </main>
    )
}