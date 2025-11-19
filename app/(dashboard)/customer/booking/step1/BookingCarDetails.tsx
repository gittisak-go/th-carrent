import {CarIcon, CarSeat, GasPump} from "@/app/icons";
import {Car} from "@/lib/types/models";
import {fuelTypes} from "@/lib/types/fuelTypes";
import BookingCarCardCarousel from "@/app/(dashboard)/customer/booking/step1/BookingCarCardCarousel";
import {FaCalendarCheck, FaDollarSign, FaStar} from "react-icons/fa6";

export default function BookingCarDetails({props}: { props: Car, })
{
    return (
        <div className='flex flex-col gap-2 w-full lg:w-3/5 h-full'>
            <div
                className="bg-base-100 w-full rounded-t-box rounded-b shadow-lg">

                <figure className="relative h-64 sm:h-96 w-full rounded-t-box rounded-b overflow-hidden">
                    <BookingCarCardCarousel
                        className="h-full w-full hover:cursor-grab active:cursor-grabbing"
                        imagesURLs={props.img_urls}
                    />

                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white z-10"
                         style={{backgroundColor: props.color}}
                         title="Color of the car"/>

                    <span
                        className='absolute w-full h-20 z-10 bottom-0 inset-x-0 p-3 px-5 text-white text-3xl font-bold 
                        bg-gradient-to-t from-black/80 via-black/60 to-transparent'>
                        
                        <h3 className='mt-3'>{props.manufacturer + ' ' + props.model}</h3>
                    </span>
                </figure>
            </div>

            <div
                className="bg-base-100 rounded-b-box rounded-t shadow-lg">

                <div className="card-body p-6 pb-7">
                    <IconsSection props={props}/>
                </div>
            </div>
        </div>
    );
}

function IconsSection({props}: { props: Car })
{
    return (
        <div className='flex flex-wrap justify-around items-center gap-4 text-lg font-medium'>

            <div className="flex flex-col gap-4 sm:contents">
            
            <div className="tooltip" data-tip="Fuel Type">
                <div className="flex items-center gap-2">
                    <GasPump className='text-primary' width={'1.4em'}/>
                    <span>{fuelTypes[props.fuel - 1].label}</span>
                </div>
            </div>

            <div className="tooltip" data-tip="Seats Count">
                <div className="flex items-center gap-2">
                    <CarSeat className='text-primary'/>
                    <span>{props.seats} seat{props.seats > 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="tooltip" data-tip="Car Type">
                <div className="flex items-center gap-2">
                    <CarIcon className='text-primary'/>
                    <span>{props.type_display}</span>
                </div>
            </div>
            </div>
            
            <div className="flex flex-col gap-4 sm:contents">
                
                <div className="md:tooltip z-20" data-tip="How many times this car has been rented before.">
                    <div className="flex items-center gap-2">
                        <FaCalendarCheck className='text-primary size-[1.3em]'/>
                        <span>3 rents</span>
                    </div>
                </div>
                
                <div className="tooltip z-20" data-tip="Price per day">
                    <div className="flex items-center gap-2">
                        <FaDollarSign className='text-primary size-[1.3em]'/>
                        <span>{props.price_per_day}<span className="text-gray-500 text-sm">/day</span></span>
                    </div>
                </div>
                
                <div className="tooltip z-20" data-tip="Rating">
                    <div className="flex items-center gap-2">
                        <FaStar className='text-primary size-[1.3em]'/>
                        <span>5 <span className="text-sm text-gray-500">(273 ratings)</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}