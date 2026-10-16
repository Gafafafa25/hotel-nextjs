export type BookedDateRange = {
    checkIn: string;
    checkOut: string;
}

export type RoomType = 'standard' | 'deluxe' | 'family';

export type Room = {
    id: number;
    room_number: string;
    name: string;
    description: string;
    price: number;
    maxGuests: number;
    image: string;
    amenities: string[];
}

export type SearchParams = {
    checkIn: string;
    checkOut: string;
    guests: number;
}