import {Room} from "@/app/types/room";
import {RoomCard} from "@/app/components/RoomCard";
import * as React from "react";

export default function RoomsGrid ({rooms} : {rooms : Room[]} )  {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                rooms.map((room: Room) => (
                    <RoomCard key={room.id} room={room}/>
                ))
            }
        </div>
    )
}