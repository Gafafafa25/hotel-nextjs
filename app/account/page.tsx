// import {getCurrentGuest} from "@/app/lib/guest";
import AccountLoginForm from "@/app/components/AccountLoginForm";

export const dynamic = "force-dynamic"

export default function AccountPage() {
    // const user = getCurrentGuest()
    return <AccountLoginForm/>

    // if (!user) {
    //     return <AccountLoginForm/>
    // }


}