"use client"

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

const emptyForm = {
    login: "",
    password: ""
}

export default function LoginForm() {
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")
    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response = await fetch("api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()

        setForm(emptyForm)
        if (!data.ok) {
            setMessage("Login error")
            return
        }
        router.refresh()
    }

    return (
        <main>
            <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200  w-full max-w-sm">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Login
                            <input type="text"
                                   value={form.login}
                                   onChange={(e) => {
                                       setForm({...form, login: e.target.value})
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   required/>
                        </label>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password
                            <input type="password"
                                   value={form.password}
                                   onChange={(e) => {
                                       setForm({...form, password: e.target.value})
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   required/>
                        </label>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700
                            transition-colors duration-200">
                            Login
                        </button>
                    </form>
                    <div>
                        <span>{message}</span>
                    </div>
                </div>
            </section>
        </main>
    )
}