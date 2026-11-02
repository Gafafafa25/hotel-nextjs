import AccountRegisterForm from "@/app/components/AccountRegisterForm";
import {getCurrentGuest} from "@/app/lib/guest";
// import {redirect} from "next/navigation";



export default  async function registerPage () {
    const user = await getCurrentGuest()
    if (!user) {
        return <AccountRegisterForm />
    }


    return <p>ok</p>
    // redirect('/account/bookings')
}