import {getCurrentAdmin} from "@/app/lib/admin-auth";
import LoginForm from "@/app/components/LoginForm";
import {redirect} from "next/navigation";

export default async function AdminLoginPage() {
    console.log("loginnnnn")
    const admin = await getCurrentAdmin()
    if (!admin) {
        return <LoginForm/>
    }

    // redirect('/admin')
    redirect('/admin/bookings')
}