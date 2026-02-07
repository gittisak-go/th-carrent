import { getAllCars } from "@/lib/data/mockCars";
import Link from "next/link";
import Image, {StaticImageData} from 'next/image';
import carsCardImage from '@/public/images/admin-dashboard-cars-card.jpg';
import bookingsCardImage from '@/public/images/admin-dashboard-bookings-card.jpeg';

export const metadata = {
    title: 'แดชบอร์ด | Rungroj CarRental - Admin',
    description: 'ยินดีต้อนรับสู่แดชบอร์ดผู้ดูแลระบบ Rungroj CarRental จัดการการจองและรถยนต์ได้อย่างง่ายดาย',
};

export default async function AdminDashboard()
{
    const carCount = getAllCars().length;

    return (
        <div className="px-4 md:p-8 py-8 flex flex-col items-center gap-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">

                <ManageCard
                    linkHref="/admin/bookings/"
                    title="จัดการการจอง"
                    description="ดูและจัดการการจองทั้งหมดจากลูกค้า"
                    backgroundImage={bookingsCardImage}
                    color="accent"
                    count={23}
                />

                <ManageCard
                    linkHref="/admin/cars/"
                    title="จัดการรถ"
                    description="เพิ่ม แก้ไข หรือลบรถในระบบของคุณ"
                    backgroundImage={carsCardImage}
                    color="primary"
                    count={carCount || 0}
                />
            </div>
        </div>
    );
}

function ManageCard({
                        linkHref,
                        title,
                        description,
                        backgroundImage,
                        color,
                        count,
                    }: {
    linkHref: string;
    title: string;
    description: string;
    backgroundImage: StaticImageData;
    color: string;
    count: number;
})
{
    return (
        <Link href={linkHref}>
            <div
                className={`card card-compact sm:card-normal h-[250px] md:h-[500px] image-full w-full max-w-96 shadow-xl transform hover:scale-105 transition-transform`}>
                <figure>
                    <Image
                        fill
                        className='w-full rounded-box'
                        src={backgroundImage}
                        alt={title}/>
                </figure>

                <div className={`card-body text-${color}-content`}>
                    <h2 className={`card-title text-${color}`}>{title}</h2>
                    <p>{description}</p>

                    <div className="card-actions items-center justify-end">
                        
                        <span className={` mr-auto`}>
                            <span className={`text-${color} font-bold text-lg`}>{count}</span> <span
                            className='font-normal text-content text-sm'> {title === 'จัดการการจอง' ? 'การจอง' : 'รถ'}
                            </span>
                        </span>

                        <button className={`btn btn-${color} text-sm`}>จัดการ</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}