import RoomsGrid from "@/app/components/RoomsGrid";
import {getRoomsByIds} from "@/app/lib/rooms";

export default async function SearchResultsPage({searchParams}:
                                                    {
                                                        searchParams: Promise<{
                                                            ids?: string[],
                                                            check_in?: string,
                                                            check_out?: string,
                                                            guests?: string
                                                        }>;
                                                    }) {

    const sp = await searchParams
    const {ids, check_in, check_out, guests} = sp

    if (!ids || ids.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Search results</h1>
                <p className="text-2xl font-bold tracking-wide mb-8 text-gray-900">
                    There are no available rooms for selected dates:
                </p>
                <p className="mb-8">Check In: {check_in}, Check Out: {check_out}</p>
                    <a href="/rooms"
                       className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Back to Rooms →
                    </a>
            </div>
        )
    }

    const idsNums = Array.isArray(ids) ? ids.map(Number) : [Number(ids)]

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