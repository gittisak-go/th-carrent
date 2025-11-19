import { getAllCars, getCarTypes } from "@/lib/data/mockCars";
import Link from "next/link";
import {Car} from "@/lib/types/models";
import CarCard from "@/app/(dashboard)/admin/cars/CarCard";
import * as m from "framer-motion/m";
import {FaPlus} from "react-icons/fa6";

export const metadata = {
    title: 'จัดการรถ | th-carrent - Admin',
    description: 'ดู แก้ไข และเพิ่มรถในระบบของคุณผ่านแผงควบคุมผู้ดูแลระบบ',
};

export default async function AdminCarsPage()
{
    let cars: Car[] = getAllCars();
    const carTypes = getCarTypes();

    // Order the cars with no images first.
    cars = cars.sort((a, b) =>
    {
        if (a.img_urls === null && b.img_urls !== null) return -1;
        if (a.img_urls !== null && b.img_urls === null) return 1;
        return 0; // Preserve price sorting for other cases
    });

    // Populate the type_display for each car.
    cars.forEach(car =>
    {
        const carType = carTypes.find(type => type.value === car.type_id.toString());
        if (carType) car.type_display = carType.label;
    });

    if (!cars || cars.length <= 0) return (
        <div className='flex flex-col justify-center items-center gap-4 h-full min-h-96 py-8'>
            <h2 className='text-lg font-semibold'>ยังไม่มีรถในระบบ</h2>
            <Link href={'/admin/cars/new-car/'} className='btn btn-primary text-lg'>เพิ่มรถ</Link>
        </div>
    )

    return (
        <div className='flex flex-col gap-8 py-10 px-4 md:px-8 lg:px-14 relative'>

            {/* Title */}
            <m.h2 className='font-bold bg-gradient-to-br text-3xl lg:text-4xl z-10 
                lg:absolute top-12 lg:left-14
                from-emerald-600 via-emerald-700 to-emerald-900 bg-clip-text text-transparent'
                  initial={{x: -30, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{duration: 0.6}}>
                รถของเรา
            </m.h2>

            <Link className='btn btn-neutral btn-square z-20 text-lg shadow-xl
                             fixed lg:sticky bottom-8 lg:top-20 lg:ml-auto
                             right-4 md:right-8 lg:right-14'
                  href={'/admin/cars/new-car/'}
                  title={'เพิ่มรถใหม่เข้าระบบ'}>
                <FaPlus className='text-primary'/>
            </Link>

            <section
                className='grow relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                           gap-8 md:gap-6 justify-center items-center'>
                {
                    cars.map((car, index) =>
                        <CarCard key={index} props={{...car}}/>)
                }
            </section>
        </div>
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
//             "img_urls": [],
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