export type Car = {
    id?: number;
    manufacturer: string;
    model: string;
    type_id: number;
    type_display?: string;
    price_per_day: number;
    fuel: number;
    seats: number;
    color: string;
    img_urls: string[];
    transmission?: string;
    doors?: number;
};

export type Booking = {
    id?: number;
    car_id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    pick_location: object;
    status: number;
};