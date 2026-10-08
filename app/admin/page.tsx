import LoginForm from "@/app/components/LoginForm";
import {getCurrentAdmin} from "@/app/lib/admin-auth";
import AdminPanel from "@/app/components/AdminPanel";


export const dynamic = "force-dynamic"

export default async function AdminPage() {
    const admin = await getCurrentAdmin()
    if (!admin) {
        return <LoginForm/>
    }
    return (
        <AdminPanel login={admin.login} role={admin.role}/>
    )
}