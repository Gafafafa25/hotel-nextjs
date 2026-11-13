import AdminAccess from "@/app/components/AdminAccess";

export default function AdminPanel({login, role}: { login: string, role: string }) {

    return (
        <main>
            <section className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Admin panel</h1>
                <div>
                    {role === "admin" && (
                        <AdminAccess/>
                    )}
                </div>
            </section>
        </main>
    )
}