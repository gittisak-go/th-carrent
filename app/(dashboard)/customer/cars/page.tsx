import Link from "next/link";
import * as m from "framer-motion/m";
import FeaturedCarsCarousel from "@/app/(dashboard)/customer/cars/FeaturedCarCard";
import CarCard from "@/app/(dashboard)/customer/cars/CarCard";
import {FaFilterCircleXmark, FaDollarSign, FaLocationDot, FaCar, FaGasPump} from "react-icons/fa6";
import {redirect} from "next/navigation";
import {getDaysCountFromDateRange} from "@/lib/util/util";
import {getAllCars, getFeaturedCars, mockCarTypes} from "@/lib/data/mockCars";

export const metadata = {
    title: 'เลือกรถเช่า | th-carrent',
    description: 'เลือกรถเช่าที่เหมาะกับคุณ บริการรถเช่าอุดรธานี รุ่งโรจน์ คาร์เร้นท์',
};

export default async function CustomerCarsPage({searchParams}: {
    searchParams: Promise<{ pickupData: string, deliveryLocation: string }>
})
{
    const {pickupData, deliveryLocation} = await searchParams;
    if (!pickupData || !deliveryLocation) redirect('/customer/');

    const pickupDataJson = JSON.parse(pickupData)
    const rentDays = getDaysCountFromDateRange(pickupDataJson['pickup-date']);

    // ใช้ข้อมูล mock สำหรับ demo (ไม่ต้องเชื่อมต่อ database)
    const cars = getAllCars();
    const carTypes = mockCarTypes;

    const featuredCars = getFeaturedCars();
    const regularCars = cars.filter(car => !featuredCars.includes(car));

    if (!cars || cars.length <= 0) return (
        <div className='flex flex-col justify-center items-center gap-4 h-full'>
            <h2 className='text-lg font-semibold'>Sorry there isn&#39;t any cars for renting in your region</h2>
            <Link href={'/customer/'} className='btn btn-primary text-lg'>Try Another Location</Link>
        </div>
    )

    return (
        <div className='flex flex-col gap-8 py-10 pb-0 px-4 md:px-8 lg:px-14'>

            <FeaturedCarsCarousel
                className={'w-full h-auto mt-8 md:bg-gradient-to-bl from-zinc-700 to-stone-900 dark:bg-none dark:md:bg-base-100 md:rounded-3xl md:shadow-lg md:!p-4'}
                rentDate={pickupData}
                deliveryLocation={deliveryLocation}
                cars={featuredCars}/>

            <section
                className='flex flex-col gap-8 py-8 -mx-4 md:-mx-8 lg:-mx-14 px-4 md:px-8 lg:px-14 relative'>

                <div className="flex gap-4 items-center justify-between">
                    <div className='text-3xl lg:text-4xl z-10'>
                        <m.h2 className='text-[length:inherit] font-bold text-base-content'
                              initial={{x: -30, opacity: 0}}
                              animate={{x: 0, opacity: 1}}
                              transition={{duration: 0.6}}>
                            Choose a car that <span
                            className='text-[length:inherit] font-bold bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 bg-clip-text text-transparent'>
                                        fits you!
                                    </span>
                        </m.h2>
                    </div>

                    <FiltersSection/>
                </div>

                {/* Cars Cards Section */}
                <section
                    className='grow relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap gap-8 md:gap-6 justify-center items-center'>
                    {regularCars.map((car, index) =>
                        <CarCard
                            key={index}
                            rentDaysCount={rentDays}
                            href={`/customer/booking/step1?car=${encodeURIComponent(JSON.stringify(car))}&rentDate=${pickupData}&deliveryLocation=${deliveryLocation}`}
                            props={{...car}}/>)}
                </section>
            </section>
        </div>
    );
}

function FiltersSection()
{
    return (
        <section className='hidden md:flex p-2 rounded-lg backdrop-blur-lg bg-white dark:bg-black text-base-content 
                 bg-opacity-50 dark:bg-opacity-50 shadow z-10 
                 items-center justify-evenly sticky top-20'>
            <div className="tooltip" data-tip="Filter by price">
                <button className='btn btn-ghost btn-square btn-md grow'><FaDollarSign/></button>
            </div>
            <div className="tooltip" data-tip="Filter by location">
                <button className='btn btn-ghost btn-square btn-md grow'><FaLocationDot/></button>
            </div>
            <div className="tooltip" data-tip="Filter by car type">
                <button className='btn btn-ghost btn-square btn-md grow'><FaCar/></button>
            </div>
            <div className="tooltip" data-tip="Filter by fuel type">
                <button className='btn btn-ghost btn-square btn-md grow'><FaGasPump/></button>
            </div>
            <div className="tooltip" data-tip="Clear filters">
                <button className='btn btn-square btn-md [&:not(:hover)]:btn-ghost hover:!btn-error grow'>
                    <FaFilterCircleXmark/>
                </button>
            </div>
        </section>
    );
}

// const cars: Car[] =
//     [
//         {
//             "id": 16,
//             "manufacturer": "Merdeces",
//             "model": "AMG GT",
//             "type_id": 5,
//             "price_per_day": 119.99,
//             "fuel": 2,
//             "seats": 2,
//             "color": "#FFFF00",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/efdb92e60ba98mercedes amg gt.jpg"
//             ],
//         },
//         {
//             "id": 12,
//             "manufacturer": "BMW",
//             "model": "M4",
//             "type_id": 6,
//             "price_per_day": 99.99,
//             "fuel": 2,
//             "seats": 4,
//             "color": "#0026ff",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/c0ced153e7b26bmw m4 convertible.jpg"
//             ],
//         }, {
//         "id": 12,
//         "manufacturer": "BMW",
//         "model": "M4",
//         "type_id": 6,
//         "price_per_day": 99.99,
//         "fuel": 2,
//         "seats": 4,
//         "color": "#0026ff",
//         "img_urls": [
//             "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/c0ced153e7b26bmw m4 convertible.jpg"
//         ],
//     },
//         {
//             "id": 10,
//             "manufacturer": "Porsche",
//             "model": "911",
//             "type_id": 5,
//             "price_per_day": 89.99,
//             "fuel": 2,
//             "seats": 4,
//             "color": "#FFFFFF",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/5fb56aafa2556024-2023-Porsche-911-Sport-Classic-side-view.jpg",
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/df3ca7ecb9f8b911sc_01.jpg",
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/113483237a1c24b589199cdd14fdd802d27d0928f3164_1712430191030.jpg"
//             ],
//         },
//         {
//             "id": 17,
//             "manufacturer": "Mitsubishi",
//             "model": "Triton",
//             "type_id": 3,
//             "price_per_day": 42.99,
//             "fuel": 1,
//             "seats": 4,
//             "color": "#5cb97c",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/31e291afdf0eaMitsubishi-Triton.jpg"
//             ],
//         },
//         {
//             "id": 15,
//             "manufacturer": "Kia",
//             "model": "Sorento",
//             "type_id": 1,
//             "price_per_day": 39.99,
//             "fuel": 3,
//             "seats": 6,
//             "color": "#0026ff",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/3fa02aebf0362kia_sorento-hybrid_.jpg"
//             ],
//         },
//         {
//             "id": 13,
//             "manufacturer": "Chrysler",
//             "model": "Pacifica",
//             "type_id": 4,
//             "price_per_day": 39.99,
//             "fuel": 3,
//             "seats": 6,
//             "color": "#000000",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/91b77152f2777Chrysler Pacifica.jpg"
//             ],
//         },
//         {
//             "id": 14,
//             "manufacturer": "Ford",
//             "model": "Maverick",
//             "type_id": 2,
//             "price_per_day": 35.99,
//             "fuel": 3,
//             "seats": 4,
//             "color": "#5e7b83",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/f7e8fdcb4368fform maverick.jpg"
//             ],
//         },
//         {
//             "id": 18,
//             "manufacturer": "Volkswagen",
//             "model": "Passat B9",
//             "type_id": 8,
//             "price_per_day": 33.99,
//             "fuel": 2,
//             "seats": 5,
//             "color": "#5cb97c",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/0dc7d2134837eVW-Passat-B9-sedan-rendering-1.jpg"
//             ],
//         },
//         {
//             "id": 11,
//             "manufacturer": "Toyota",
//             "model": "Corolla",
//             "type_id": 7,
//             "price_per_day": 29.99,
//             "fuel": 2,
//             "seats": 5,
//             "color": "#FFFFFF",
//             "img_urls": [
//                 "https://urlznusnzjxlkusrpzpn.supabase.co/storage/v1/object/public/cars/f52776bbd7fe52021_toyota_corolla-hatchback_4dr-hatchback_se-nightshade-edition_fq_oem_1_1600.jpg"
//             ],
//         }
//     ]


// const carTypes = [
//     {
//         "value": 1,
//         "label": "SUV"
//     },
//     {
//         "value": 2,
//         "label": "Truck"
//     },
//     {
//         "value": 3,
//         "label": "Pickup"
//     },
//     {
//         "value": 4,
//         "label": "Minivan"
//     },
//     {
//         "value": 5,
//         "label": "Sport"
//     },
//     {
//         "value": 6,
//         "label": "Convertible"
//     },
//     {
//         "value": 7,
//         "label": "Hatchback"
//     },
//     {
//         "value": 8,
//         "label": "Sedan"
//     },
//     {
//         "value": 9,
//         "label": "Van"
//     }
// ];
