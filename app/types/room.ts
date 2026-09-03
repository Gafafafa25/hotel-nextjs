export type BookedDateRange = {
    checkIn: string;
    checkOut: string;
}

export type Room = {
    id: number;
    name: string;
    description: string;
    price: number;
    maxGuests: number;
    amenities: string[];
    image: string;
    bookedDates: BookedDateRange[];
}

export type SearchParams = {
    checkIn: string;
    checkOut: string;
    guests: number;
}