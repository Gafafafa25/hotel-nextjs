import BookingForm from "@/app/components/BookingForm";
import {getCurrentGuest} from "@/app/lib/guest";
// import AccountLoginForm from "@/app/components/AccountLoginForm";
import AccountAuth from "@/app/components/AccountAuth";

export default async function BookingPage({searchParams}:
    { searchParams: Promise<{ ids?: string[],  check_in: string, check_out: string, guests?: string, room_id: string,
            room_name: string }>; }) {
    const sp = await searchParams
    const {ids, check_in, check_out, guests, room_id, room_name} = sp

    const user = await getCurrentGuest()

    return (
        <div>
            {/*check auth if not register or login to form*/}
            {user ?
                <BookingForm check_in={check_in} check_out={check_out} room_id={room_id} room_name={room_name} />
                :
                <AccountAuth/>
                // <AccountLoginForm/>
            }
            {/*<BookingForm check_in={check_in} check_out={check_out} room_id={room_id} room_name={room_name} />*/}
        </div>
    )
}