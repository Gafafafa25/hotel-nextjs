"use client"

import {useRouter} from "next/navigation";

export default function AccountLogoutButton() {
    const router = useRouter()

    async function handleLogout() {
        try {
            const res = await fetch("/api/account/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!res.ok) throw new Error('Network response was not ok')

            router.push('/account')
            router.refresh()
        } catch (e) {
            console.error('Logout error', e)
        }
    }

    return (
        <button type="button"
                onClick={handleLogout}
                className="btn btn-primary text-indigo-600 uppercase"
        >
            Logout
        </button>

    )
}