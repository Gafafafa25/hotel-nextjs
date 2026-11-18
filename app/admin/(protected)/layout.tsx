import {getCurrentAdmin} from "@/app/lib/admin-auth";
import {redirect} from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import LoginForm from "@/app/components/LoginForm";

// export const dynamic = 'force-dynamic'

export default async function AdminLayout({children}: { children: React.ReactNode }) {
    const admin = await getCurrentAdmin()

    if (!admin) {
        redirect('/admin/login') //error
        // return <LoginForm/>
    }

    if (admin.role !== 'admin') {
        return <div>Have not access</div>
    }

    return(
        <div className="flex min-h-screen">
            <Sidebar role={admin.role}/>
            <main className="flex-1 p-6">{children}</main>
        </div>
    )


}