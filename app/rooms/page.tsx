
// import * as React from 'react';
import {getRooms} from "@/app/lib/rooms";
import RoomsGrid from "@/app/components/RoomsGrid";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Rooms',
    description: 'Rooms page',
};

export default async function RoomsPage() {
    // const [filterType, setFilterType] = React.useState<RoomType | ''>('')
    //todo: filter
    const filteredRooms = await getRooms()
    // console.log(filteredRooms, "filteredRooms")

    // const filteredRooms = filterType === '' ?
    //     roomsData : roomsData.filter(room => room.name === filterType)


    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Rooms</h1>
            {/*<p className="">Rooms page</p>*/}
            <RoomsGrid rooms={filteredRooms} />
        </main>
    )
}