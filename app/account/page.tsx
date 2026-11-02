import {getCurrentGuest} from "@/app/lib/guest";
import AccountLoginForm from "@/app/components/AccountLoginForm";
import {redirect} from "next/navigation";

export const dynamic = "force-dynamic"

export default async function AccountPage() {
    const user = await getCurrentGuest()

    if (!user) {
        return <AccountLoginForm/>
    }

    redirect('/account/bookings')
}