import RoomsGrid from "@/app/components/RoomsGrid";
import {getRoomsByIds} from "@/app/lib/rooms";

export default async function SearchResultsPage({searchParams}:
{ searchParams: Promise<{ ids?: string[],  check_in?: string, check_out?: string, guests?: string }>; }) {
// export default async function SearchResultsPage({ searchParams }: { searchParams: Promise<URLSearchParams> }) {

    const sp = await searchParams
    const {ids, check_in, check_out, guests} = sp
    // if (!ids) return
    //check if  Array.isArray(sp)
    const idsNums = ids.map(Number)


    const availableRooms = await getRoomsByIds(idsNums)

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Search results</h1>
            <p className="text-2xl font-bold tracking-wide mb-8 text-gray-900">
                Check In: {check_in}, Check Out: {check_out}, Guests: {guests}
            </p>
            <RoomsGrid rooms={availableRooms}/>
        </div>
    )
}