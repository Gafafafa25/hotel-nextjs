"use client"

import {useState} from "react";
import RegisterForm from "@/app/components/RegisterForm";
import Link from "next/link";

export default function AdminAccess() {
    const [showRegisterForm, setShowRegisterForm] = useState(true)
    const [showRooms, setShowRooms] = useState(false)

    const navItems = [
        {href: '/admin/functions', label: 'Регистрация функций', icon: '⚡'},
        {href: '/admin/components', label: 'Компоненты продукта', icon: '📦'},
    ];

    return (
        <main>
            <div className="flex items-center justify-between bg-white">
                <button
                    type="button"
                    onClick={() => {
                        setShowRegisterForm(!showRegisterForm)
                        setShowRooms(false)
                    }}>Add user
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setShowRooms(!showRooms)
                        setShowRegisterForm(false)
                    }}>Add room
                </button>
            </div>
            <div>
                {showRegisterForm && (
                    <RegisterForm/>
                )}
            </div>
        </main>
    )
}