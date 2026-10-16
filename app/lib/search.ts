// import roomsData from "../data/rooms.json";
// import type {Room, SearchParams} from "@/app/types/room";

// const rooms: Room[] = roomsData; =>
// const rooms = roomsData as Room[];
//
//
//
// // Checking for the intersection of two dates:
// function datesOverlap  (start1: string, end1: string,
//     start2: string, end2: string) : boolean {
//     const s1 = new Date(start1).getTime();
//     const e1 = new Date(end1).getTime();
//     const s2 = new Date(start2).getTime();
//     const e2 = new Date(end2).getTime();
//
//     return s1 < e2 && s2 < e1;
// }
//
// export function getAvailableRooms(params: SearchParams): Room[] {
//     return rooms.filter((room: Room) => {
//         if (room.maxGuests < params.guests) return false;
//
//         const hasConflict = room.bookedDates.some((booking)=>
//         datesOverlap(params.checkIn, params.checkOut, booking.checkIn, booking.checkOut))
//
//         return !hasConflict;
//     })
// }
//
// //get the nearest check‑in date - today
import {pool} from "@/app/lib/db";

export function getTodayString(): string {
    return new Date().toISOString().split('T')[0];
}
