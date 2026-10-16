"use client"

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

const emptyForm = {
    login: "",
    password: "",
    role: "manager"
}

export default function RegisterForm() {
    const [form, setForm] = useState(emptyForm)
    const [message, setMessage] = useState("")

    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await fetch("api/admin/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()


        if (!data.ok) {
            setMessage("Register error")
        } else {
            alert("registered user")
            setForm(emptyForm)
        }

        router.push('/admin')
        router.refresh()
    }

    return (
        <main>
            <section className="max-w-4xl mx-auto py-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-full max-w-sm">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Login
                            <input
                                type="text"
                                value={form.login}
                                onChange={(e) => {
                                    setForm({...form, login: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required/>
                        </label>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) => {
                                    setForm({...form, password: e.target.value})
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required/>
                        </label>
                        <select
                            value={form.role}
                            onChange={(e) => {
                                setForm({...form, role: e.target.value})
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="intern">Intern</option>
                        </select>
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