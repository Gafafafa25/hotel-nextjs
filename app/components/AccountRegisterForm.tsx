"use client"

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

const emptyForm = {
    name: "",
    email: "",
    country: "",
    passport: "",
    password: "",
}

export default function AccountRegisterForm() {
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")

    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(form, "form")

        const response = await fetch("api/account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()
        console.log(data, " data")

        if (!data.ok) {
            setMessage("Register error")
        } else {
            alert("registered user")
            setForm(emptyForm)
        }

        // router.push('/account')


        // router.back()
        router.refresh()
    }

    return (
        <main>
            <section className="max-w-4xl mx-auto py-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-2">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email:
                            <input
                                type="text"
                                value={form.email}
                                onChange={(e) => {
                                    setForm({...form, email: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required/>
                        </label>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country:
                            <input
                                type="text"
                                value={form.country}
                                onChange={(e) => {
                                    setForm({...form, country: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required/>
                        </label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password:
                            <input
                                type="text"
                                value={form.password}
                                onChange={(e) => {
                                    setForm({...form, password: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                required
                            />
                        </label>


                        <button type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Register
                        </button>
                    </form>
                    <span>{message}</span>
                </div>
            </section>
        </main>
    )
}