'use client';

import { Car } from "@/lib/types/models";
import { useState } from "react";
import { confirmPromptPayPayment } from "@/app/(dashboard)/customer/booking/step1/action";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import PromptPayQR from "@/app/components/PromptPayQR";
import { FaCalendarDays, FaDownLong, FaMapLocation, FaUpLong } from "react-icons/fa6";

interface PromptPayPaymentContentProps {
    car: Car;
    rentDate: {
        'pickup-date': string;
        'pickup-time': string;
    };
    deliveryLocation: {
        lat: number;
        lng: number;
    };
    paymentId: string;
    totalAmount: number;
    rentDaysCount: number;
    pickupDates: string[];
    pickupTime: string;
}

export default function PromptPayPaymentContent({
    car,
    rentDate,
    deliveryLocation,
    paymentId,
    totalAmount,
    rentDaysCount,
    pickupDates,
    pickupTime,
}: PromptPayPaymentContentProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const router = useRouter();

    const handlePaymentConfirmation = async () => {
        setIsConfirming(true);

        const { success, error } = await confirmPromptPayPayment(paymentId);

        if (error || !success) {
            toast.error(`ไม่สามารถยืนยันการชำระเงินได้: ${error}`);
            setIsConfirming(false);
            return;
        }

        // Redirect to success page
        const params = new URLSearchParams({
            car: encodeURIComponent(JSON.stringify(car)),
            rentDate: JSON.stringify(rentDate),
            deliveryLocation: JSON.stringify(deliveryLocation),
            session_id: paymentId,
        });

        router.push(`/customer/booking/step3?${params.toString()}`);
    };

    // Get PromptPay phone number from environment
    const promptPayPhone = process.env.NEXT_PUBLIC_PROMPTPAY_PHONE;

    return (
        <div className="flex flex-col gap-8 py-10 px-4 md:px-8 lg:px-14">
            <ul className="steps mx-auto w-full max-w-[1000px]">
                <li className="step step-primary">รายละเอียด</li>
                <li className="step step-primary">ชำระเงิน</li>
                <li className="step">เสร็จสิ้น!</li>
            </ul>

            <div className="flex flex-col lg:flex-row justify-center gap-8">
                {/* Payment QR Section */}
                <div className="flex flex-col gap-6 lg:w-2/5 bg-base-100 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center">
                        ชำระเงินด้วย PromptPay
                    </h2>

                    <div className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-sm">
                            กรุณาสแกน QR Code ด้านล่างผ่านแอปธนาคารของคุณเพื่อชำระเงิน
                        </span>
                    </div>

                    <PromptPayQR
                        phoneNumber={promptPayPhone}
                        amount={totalAmount}
                        className="w-full"
                    />

                    <div className="flex flex-col gap-2 text-center">
                        <p className="text-lg font-semibold">
                            จำนวนเงินที่ต้องชำระ
                        </p>
                        <p className="text-3xl font-bold text-primary">
                            ฿{totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    <div className="divider">หลังจากชำระเงินแล้ว</div>

                    <button
                        onClick={handlePaymentConfirmation}
                        disabled={isConfirming}
                        className="btn btn-primary w-full"
                    >
                        {isConfirming ? (
                            <>
                                <MoonLoader size={20} color="#ffffff" />
                                กำลังยืนยัน...
                            </>
                        ) : (
                            'ยืนยันการชำระเงิน'
                        )}
                    </button>

                    <p className="text-xs text-center text-gray-500">
                        กดปุ่มยืนยันหลังจากที่คุณชำระเงินผ่านแอปธนาคารเรียบร้อยแล้ว
                    </p>
                </div>

                {/* Booking Summary Section */}
                <div className="flex flex-col gap-4 lg:w-2/5 h-fit bg-base-100 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold">สรุปการจอง</h2>

                    <div className="flex flex-col gap-4">
                        <img
                            src={car.img_urls[0]}
                            alt={`${car.manufacturer} ${car.model}`}
                            className="rounded-lg w-full"
                        />
                        <h3 className="text-xl font-semibold">
                            {car.manufacturer} {car.model}
                        </h3>
                    </div>

                    <div className="divider"></div>

                    <BookingItem
                        title="ระยะเวลาเช่า"
                        icon={<FaCalendarDays className="text-primary" />}
                    >
                        {rentDaysCount} วัน
                    </BookingItem>

                    <BookingItem
                        title="วันและเวลารับรถ"
                        icon={<FaDownLong className="text-primary" />}
                    >
                        {pickupDates[0]} - {pickupTime}
                    </BookingItem>

                    <BookingItem
                        title="วันและเวลาคืนรถ"
                        icon={<FaUpLong className="text-primary" />}
                    >
                        {/* Return time is hardcoded to 12:00 AM as per business logic */}
                        {pickupDates[1]} - 12:00 AM
                    </BookingItem>

                    <BookingItem
                        title="สถานที่ส่งรถ"
                        icon={<FaMapLocation className="text-primary" />}
                    >
                        <span className="text-sm">
                            {deliveryLocation.lat.toFixed(6)}, {deliveryLocation.lng.toFixed(6)}
                        </span>
                    </BookingItem>

                    <div className="divider"></div>

                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>ราคารวม</span>
                        <span className="text-primary">
                            ฿{totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookingItem({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <span className="flex items-center text-gray-500 dark:text-zinc-400 gap-2 font-semibold">
                {icon} {title}
            </span>
            {children && <span className="font-bold text-lg">{children}</span>}
        </div>
    );
}
