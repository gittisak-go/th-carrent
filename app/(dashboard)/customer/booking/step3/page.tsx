import {redirect} from "next/navigation";
import {Car} from "@/lib/types/models";
import {rentTimes} from "@/lib/types/rentTimes";
import {createClient} from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: 'Booking Complete | Rungroj CarRental',
    description: 'Your booking is confirmed! View your booking details and get ready for your rental.',
};

type searchParamsType = {
    searchParams: Promise<{
        car: string;
        rentDate: string;
        deliveryLocation: string;
        session_id: string;
    }>;
};

export default async function BookingStep3({searchParams}: searchParamsType)
{
    const {
        car: carJSON,
        rentDate: rentDateJSON,
        deliveryLocation: deliveryLocationJSON,
        session_id
    } = await searchParams;

    if (!carJSON || !rentDateJSON || !deliveryLocationJSON || !session_id) redirect("/customer/");

    const car = JSON.parse(decodeURIComponent(carJSON)) as Car;
    const rentDate = JSON.parse(rentDateJSON);
    const deliveryLocation = JSON.parse(deliveryLocationJSON);

    const pickupDates = rentDate["pickup-date"].split("-");
    const pickupTime = rentTimes.find((time) => time.value == rentDate["pickup-time"])?.label;

    // Save booking details to Supabase
    await saveBookingDetails({
        carId: car.id!,
        pickupDate: rentDate["pickup-date"],
        pickupTime: rentDate["pickup-time"],
        deliveryLocation: deliveryLocation,
        checkoutId: session_id
    });

    return (
        <div className="flex flex-col items-center gap-8 py-10 px-4 md:px-8 lg:px-14">
            <ul className="steps mx-auto w-full max-w-[1000px]">
                <li className="step step-primary">Details</li>
                <li className="step step-primary">Payment</li>
                <li className="step step-primary">Done!</li>
            </ul>

            <div
                className="flex flex-col md:flex-row gap-8 md:gap-16 items-center p-8 rounded-box shadow-lg relative bg-base-100">

                <SVGDecoration/>

                <CongratsText className='md:hidden text-center z-10 mb-8'/>

                <div className="flex flex-col items-center gap-4 w-full z-10">
                    <Image src={car.img_urls[0]} alt={`${car.manufacturer} ${car.model}`}
                         className="rounded-lg" width={400} height={300} />
                    <h3 className="text-xl font-semibold">{car.manufacturer} {car.model}</h3>
                </div>

                <div className='flex flex-col gap-8 items-start z-10 w-full'>
                    <CongratsText className='hidden md:flex'/>

                    <p className="text-lg">
                        Your car is now reserved! It will be delivered to your location on{" "}
                        <strong>
                            {pickupDates[0]}
                        </strong>
                        at <strong>
                        {pickupTime}
                    </strong>.
                    </p>

                    <p>
                        Thank you for choosing our service! If you have any questions, please contact our support team.
                    </p>

                    <Link
                        href={'/customer/'}
                        className="btn btn-primary w-full lg:w-auto">
                        Rent Another Car
                    </Link>
                </div>


            </div>
        </div>
    );
}

async function saveBookingDetails(bookingDetails: {
    carId: number;
    pickupDate: string;
    pickupTime: string;
    deliveryLocation: string;
    checkoutId: string;
})
{

    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser()

    const {error} = await supabase
        .from("bookings").insert({
            car_id: bookingDetails.carId,
            checkout_id: bookingDetails.checkoutId,
            date_range: bookingDetails.pickupDate,
            pickup_time: parseInt(bookingDetails.pickupTime),
            pickup_location: bookingDetails.deliveryLocation,
            user_id: user!.id,
        });

    // Ignore duplicate key error.
    if (error && error.code !== '23505')
    {
        console.error("Error saving booking to Supabase:", error);
        throw new Error("Could not save booking details. Please try again.");
    }
}

function CongratsText({className = ''}: { className?: string })
{
    return (
        <div className={`flex flex-col gap-8 ${className}`}>
            <h1 className="text-9xl font-bold">🎉</h1>
            <h1 className="text-3xl font-bold">Congratulations!</h1>
        </div>
    );
}

function SVGDecoration()
{
    return (
        <>
            <svg
                className='absolute right-0 top-0 rounded-tr-box z-0 pointer-events-none w-[800px]'
                id="visual" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">

                <g transform="translate(960, 0)">
                    <path
                        d="M0 275C-45.4 267.5 -90.8 260 -139 240.8C-187.2 221.5 -238.2 190.6 -257.2 148.5C-276.2 106.4 -263.1 53.2 -250 0L0 0Z"
                        className='fill-[#dbf3e1] dark:brightness-[0.40]'></path>
                    <path
                        d="M0 183.3C-30.3 178.3 -60.5 173.3 -92.7 160.5C-124.8 147.7 -158.8 127.1 -171.5 99C-184.1 70.9 -175.4 35.5 -166.7 0L0 0Z"
                        className='fill-[#90d9a6] dark:brightness-[0.85]'></path>
                    <path
                        d="M0 91.7C-15.1 89.2 -30.3 86.7 -46.3 80.3C-62.4 73.8 -79.4 63.5 -85.7 49.5C-92.1 35.5 -87.7 17.7 -83.3 0L0 0Z"
                        className='fill-primary'></path>
                </g>
            </svg>

            <svg
                className='absolute left-0 bottom-0 rounded-bl-box  z-0 pointer-events-none'
                id="visual" viewBox="0 0 1800 600" xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1">

                <g transform="translate(0, 620)">
                    <path
                        d="M0 -297C51.1 -282.4 102.1 -267.8 137.5 -238.2C172.9 -208.5 192.5 -163.7 210.4 -121.5C228.4 -79.3 244.7 -39.6 261 0L0 0Z"
                        className='fill-[#dbf3e1] dark:brightness-[0.40]'></path>
                    <path
                        d="M0 -198C34 -188.3 68.1 -178.6 91.7 -158.8C115.2 -139 128.3 -109.1 140.3 -81C152.3 -52.9 163.1 -26.4 174 0L0 0Z"
                        className='fill-[#90d9a6] dark:brightness-[0.85]'></path>
                    <path
                        d="M0 -99C17 -94.1 34 -89.3 45.8 -79.4C57.6 -69.5 64.2 -54.6 70.1 -40.5C76.1 -26.4 81.6 -13.2 87 0L0 0Z"
                        className='fill-primary'></path>
                </g>
            </svg>
        </>
    );
}