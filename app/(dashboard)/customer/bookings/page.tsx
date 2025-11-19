import LogoLink from "@/app/components/LogoLink";
import Link from "next/link";

export const metadata = {
    title: 'My Bookings | th-carrent',
    description: 'View and manage your upcoming and past car rentals.',
};

export default function CustomerBookings()
{
    return (
        <div className='flex flex-col gap-8 py-8 min-h-96 justify-center items-center h-full'>
            <LogoLink href='/admin/' replace/>
            <h2 className='text-2xl'>Coming soon...</h2>
            <Link
                href={'/customer/'}
                className='btn btn-outline'>
                Back to Dashboard
            </Link>
        </div>
    );
}