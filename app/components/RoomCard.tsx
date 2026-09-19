import {Room, RoomType} from "@/app/types/room";
import Image from 'next/image';
// import {useState} from "react";
// import roomsData from "../data/rooms.json";


interface RoomCardProps {
    room: Room
}

export function RoomCard({ room }: RoomCardProps) {
    // const [filterType, setFilterType] = useState<RoomType | ''>('')
    //
    // const filteredRooms = filterType === '' ?
    //     roomsData : roomsData.filter(room => room.name === filterType)
    return (
        <article
            className="border rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
            <div className="aspect-[4/3] overflow-hidden">
                <Image
                    src={room.image}
                    alt={room.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                <span className="font-bold text-indigo-600 text-lg">{room.price.toLocaleString('ru-RU')}₽ / night</span>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">{room.description}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{room.amenities.join(", ")}</p>
            </div>
        </article>
    )
}