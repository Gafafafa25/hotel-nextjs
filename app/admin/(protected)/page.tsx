import LoginForm from "@/app/components/LoginForm";
import {getCurrentAdmin} from "@/app/lib/admin-auth";
import {redirect} from "next/navigation";
// import AdminPanel from "@/app/components/AdminPanel";
// import Sidebar from "@/app/components/Sidebar";
// import {ReactNode} from "react";


// export const dynamic = "force-dynamic"

export default async function AdminPage() {
// export default async function AdminPage({children} : {children: React.ReactNode}) {
//     const admin = await getCurrentAdmin()
//     if (!admin) {
//         // return <LoginForm/>
//         redirect('admin/login')
//     }
// return <div>AdminPage</div>
// <AdminPanel login={admin.login} role={admin.role}/>


// return (
//     <div>
//         {/*<Sidebar role={admin.role}/>*/}
//         <div>
//             <div>AdminPage</div>
//         </div>
//     </div>
// )
//     return (
//         <div>AdminPage</div>
//     )
    redirect('/admin/bookings')
}