"use client"

import {useRouter} from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()

    async function handleLogout () {
        try {
            const res = await fetch("/api/admin/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!res.ok) throw new Error('Network response was not ok')

            router.push('/admin')
            router.refresh()
        }
        catch (e) {
            console.error('Logout error', e)
        }
    }
    return (
        <button
        onClick={handleLogout}
        className="btn btn-primary"
        >
            Logout
        </button>
    )
}