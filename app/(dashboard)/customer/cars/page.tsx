import Link from "next/link";
import * as m from "framer-motion/m";
import FeaturedCarsCarousel from "@/app/(dashboard)/customer/cars/FeaturedCarCard";
import AllCarsSlidingSection from "@/app/(dashboard)/customer/cars/AllCarsSlidingSection";
import {FaFilterCircleXmark, FaDollarSign, FaLocationDot, FaCar, FaGasPump} from "react-icons/fa6";
import {redirect} from "next/navigation";
import {getDaysCountFromDateRange} from "@/lib/util/util";
import {getAllCars, getFeaturedCars} from "@/lib/data/mockCars";

export const metadata = {
    title: 'เลือกรถเช่า | Rungroj CarRental',
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

    const featuredCars = getFeaturedCars();
    const regularCars = cars.filter(car => !featuredCars.includes(car));
    const allCarsForSliding = [...featuredCars, ...regularCars];

    if (!cars || cars.length <= 0) return (
        <div className='flex flex-col justify-center items-center gap-4 min-h-[50vh]'>
            <h2 className='text-lg font-semibold'>Sorry there isn&#39;t any cars for renting in your region</h2>
            <Link href={'/customer/'} className='btn btn-primary text-lg'>Try Another Location</Link>
        </div>
    );

    return (
        <div className='flex flex-col min-h-screen md:min-h-0 gap-6 md:gap-8 py-6 md:py-10 pb-6 px-4 md:px-8 lg:px-14'>

            <FeaturedCarsCarousel
                className={'w-full h-auto md:bg-gradient-to-bl from-neutral-800 to-black dark:bg-none dark:md:bg-base-100 md:rounded-3xl md:shadow-lg md:!p-4'}
                rentDate={pickupData}
                deliveryLocation={deliveryLocation}
                cars={featuredCars}
            />

            <section className='flex flex-col gap-4 md:gap-8 flex-1 min-h-0 md:min-h-0 py-4 md:py-8 -mx-4 md:-mx-8 lg:-mx-14 px-2 md:px-8 lg:px-14 relative'>
                <div className="flex gap-4 items-center justify-between shrink-0">
                    <div className='text-2xl md:text-3xl lg:text-4xl z-10'>
                        <m.h2 className='text-[length:inherit] font-bold text-base-content'
                              initial={{x: -30, opacity: 0}}
                              animate={{x: 0, opacity: 1}}
                              transition={{duration: 0.6}}>
                            รถทั้งหมด <span className='text-[length:inherit] font-bold bg-gradient-to-br from-emerald-500 to-emerald-700 bg-clip-text text-transparent'>12 ใบ</span>
                        </m.h2>
                    </div>
                    <FiltersSection/>
                </div>

                <AllCarsSlidingSection
                    cars={allCarsForSliding}
                    rentDaysCount={rentDays}
                    pickupData={pickupData}
                    deliveryLocation={deliveryLocation}
                />
            </section>
        </div>
    );
}

function FiltersSection()
{
    const filters = [
        { icon: <FaDollarSign />, label: 'ราคา', tip: 'Filter by price' },
        { icon: <FaLocationDot />, label: 'สถานที่', tip: 'Filter by location' },
        { icon: <FaCar />, label: 'ประเภทรถ', tip: 'Filter by car type' },
        { icon: <FaGasPump />, label: 'ประเภทเชื้อเพลิง', tip: 'Filter by fuel type' },
    ];
    return (
        <section className='flex p-2 rounded-lg backdrop-blur-lg bg-white dark:bg-black text-base-content 
                 bg-opacity-50 dark:bg-opacity-50 shadow z-10 
                 items-center gap-2 sticky top-16 md:top-20 overflow-x-auto min-h-12 md:justify-evenly'>
            <div className='flex md:hidden shrink-0 gap-2'>
                {filters.map((f, i) => (
                    <div key={i} className="tooltip tooltip-bottom" data-tip={f.tip}>
                        <button type='button' className='btn btn-ghost btn-sm rounded-full gap-1.5 min-h-10 touch-manipulation'>
                            {f.icon}<span className='text-xs'>{f.label}</span>
                        </button>
                    </div>
                ))}
                <div className="tooltip tooltip-bottom" data-tip="ล้างตัวกรอง">
                    <button type='button' className='btn btn-ghost btn-sm btn-circle min-h-10 min-w-10 touch-manipulation [&:not(:hover)]:btn-ghost hover:!btn-error'>
                        <FaFilterCircleXmark/>
                    </button>
                </div>
            </div>
            <div className='hidden md:flex grow items-center justify-evenly'>
                <div className="tooltip" data-tip="Filter by price">
                    <button type='button' className='btn btn-ghost btn-square btn-md grow'><FaDollarSign/></button>
                </div>
                <div className="tooltip" data-tip="Filter by location">
                    <button type='button' className='btn btn-ghost btn-square btn-md grow'><FaLocationDot/></button>
                </div>
                <div className="tooltip" data-tip="Filter by car type">
                    <button type='button' className='btn btn-ghost btn-square btn-md grow'><FaCar/></button>
                </div>
                <div className="tooltip" data-tip="Filter by fuel type">
                    <button type='button' className='btn btn-ghost btn-square btn-md grow'><FaGasPump/></button>
                </div>
                <div className="tooltip" data-tip="Clear filters">
                    <button type='button' className='btn btn-square btn-md [&:not(:hover)]:btn-ghost hover:!btn-error grow'>
                        <FaFilterCircleXmark/>
                    </button>
                </div>
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
