import BookingForm from "@/app/components/BookingForm";

export default async function BookingPage({searchParams}:
    { searchParams: Promise<{ ids?: string[],  check_in: string, check_out: string, guests?: string, room_id: string,
            room_name: string }>; }) {
    const sp = await searchParams
    const {ids, check_in, check_out, guests, room_id, room_name} = sp

    return (
        <div >
            <BookingForm check_in={check_in} check_out={check_out} room_id={room_id} room_name={room_name} />
        </div>
    )
}