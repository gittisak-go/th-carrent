'use client';

import { Car } from '@/lib/types/models';
import { Swiper, SwiperSlide } from 'swiper/react';
import CarCard from '@/app/(dashboard)/customer/cars/CarCard';
import 'swiper/css';

const DISPLAY_CARD_COUNT = 12;

export default function AllCarsSlidingSection({
    cars,
    rentDaysCount,
    pickupData,
    deliveryLocation,
}: {
    cars: Car[];
    rentDaysCount: number;
    pickupData: string;
    deliveryLocation: string;
}) {
    const displayCars = cars.slice(0, DISPLAY_CARD_COUNT);

    return (
        <>
            {/* Mobile: sliding cards full-screen style */}
            <section className="md:hidden w-full flex-1 min-h-0 -mx-4 px-2">
                <Swiper
                    spaceBetween={12}
                    slidesPerView={1.15}
                    centeredSlides
                    className="!overflow-visible h-full"
                >
                    {displayCars.map((car, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <CarCard
                                props={car}
                                rentDaysCount={rentDaysCount}
                                href={`/customer/booking/step1?car=${encodeURIComponent(JSON.stringify(car))}&rentDate=${pickupData}&deliveryLocation=${deliveryLocation}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Desktop: grid 12 cards */}
            <section className="hidden md:grid grow relative grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center items-stretch">
                {displayCars.map((car, index) => (
                    <CarCard
                        key={index}
                        rentDaysCount={rentDaysCount}
                        href={`/customer/booking/step1?car=${encodeURIComponent(JSON.stringify(car))}&rentDate=${pickupData}&deliveryLocation=${deliveryLocation}`}
                        props={car}
                    />
                ))}
            </section>
        </>
    );
}
