import LogoLink from "@/app/components/LogoLink";
import Link from "next/link";

export const metadata = {
    title: 'จัดการการจอง | th-carrent - Admin',
    description: 'ดูและจัดการการจองทั้งหมดจากลูกค้าในแผงควบคุมผู้ดูแลระบบ',
};

export default function AdminBookings()
{
    return (
        <div className='flex flex-col gap-8 py-8 min-h-96 justify-center items-center h-full'>
            <LogoLink href='/admin/' replace/>
            <h2 className='text-2xl'>เร็วๆ นี้...</h2>
            <Link
                href={'/admin/'}
                className='btn btn-outline'>
                กลับหน้าแดชบอร์ด
            </Link>
        </div>
    );
}