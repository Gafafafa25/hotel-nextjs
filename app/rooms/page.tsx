'use client'

import {Metadata} from "next";
import {RoomCard} from "@/app/components/RoomCard";
import {RoomType, Room} from "@/app/types/room";
import roomsData from "@/app/data/rooms.json";
import * as React from 'react';


// export const metadata: Metadata = {
//     title: 'Rooms',
//     description: 'Rooms page',
// };

export default function RoomsPage() {
    const [filterType, setFilterType] = React.useState<RoomType | ''>('')
    //todo: filter

    const filteredRooms = filterType === '' ?
        roomsData : roomsData.filter(room => room.name === filterType)

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Rooms</h1>
            <p className="">Rooms page</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    filteredRooms.map((room: Room) => (
                        <RoomCard key={room.id} room={room}/>
                    ))
                }
               {/*<RoomCard room={roomsData[0]}/>*/}
            </div>
        </main>
    )
}