import AdminAccess from "@/app/components/AdminAccess";
import {getCurrentAdmin} from "@/app/lib/admin-auth";

export default function AdminPanel({login, role}: { login: string, role: string }) {

    return (
        <main>
            <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Admin panel</h1>
                <div className="mb-6">
                    <p className="text-2xl font-bold mb-8 text-gray-900">Hello, {login}! Access: {role}</p>
                </div>
                <div>
                    {role === "admin" && (
                        <AdminAccess/>
                    )}
                </div>
            </section>
        </main>
    )
}