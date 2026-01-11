'use client'

import { useSearchParams } from 'next/navigation';
import { formatThaiPrice } from '@/lib/data/mockCars';
import Link from 'next/link';
import { useState } from 'react';

/**
 * หน้าแสดง QR Code PromptPay สำหรับการชำระเงิน
 * แทนที่การใช้ Stripe Checkout
 */
export default function PromptPayPaymentPage() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('booking_id');
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    
    // ดึงข้อมูลจาก URL params (มาจาก step1)
    const carName = searchParams.get('car_name') || 'รถเช่า';
    const totalPrice = parseInt(searchParams.get('total_price') || '0');
    
    // ข้อมูล PromptPay ของธุรกิจ
    const promptPayNumbers = [
        { label: 'เบอร์หลัก', number: '086-634-8619', name: 'รุ่งโรจน์ คาร์เร้นท์' },
        { label: 'เบอร์รอง', number: '096-363-8519', name: 'รุ่งโรจน์ คาร์เร้นท์' }
    ];

    const handlePaymentConfirm = () => {
        setPaymentConfirmed(true);
    };

    return (
        <div className="flex flex-col gap-8 py-10 px-4 md:px-8 lg:px-14 min-h-screen">
            
            <ul className="steps mx-auto w-full max-w-[1000px]">
                <li className="step step-primary">รายละเอียด</li>
                <li className="step step-primary">ชำระเงิน</li>
                <li className="step">เสร็จสิ้น!</li>
            </ul>

            <div className="max-w-2xl mx-auto w-full">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl mb-4">ชำระเงินด้วย PromptPay</h2>
                        
                        {/* รายละเอียดการจอง */}
                        <div className="bg-base-200 p-4 rounded-lg mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg">รถเช่า:</span>
                                <span className="font-semibold">{carName}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg">เลขที่การจอง:</span>
                                <span className="font-mono font-semibold">{bookingId}</span>
                            </div>
                            <div className="divider my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">ยอดรวมทั้งหมด:</span>
                                <span className="text-2xl font-bold text-primary">
                                    {formatThaiPrice(totalPrice)}
                                </span>
                            </div>
                        </div>

                        {/* คำแนะนำการโอนเงิน */}
                        <div className="alert alert-info mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div>
                                <h3 className="font-bold">วิธีการชำระเงิน</h3>
                                <div className="text-sm">
                                    1. โอนเงินผ่าน PromptPay ไปยังเบอร์ใดเบอร์หนึ่งด้านล่าง<br/>
                                    2. บันทึกหลักฐานการโอนเงิน<br/>
                                    3. ส่งสลิปการโอนเงินให้เราทาง LINE: @rungroj หรือโทร 086-634-8619<br/>
                                    4. รอการยืนยันจากทีมงาน
                                </div>
                            </div>
                        </div>

                        {/* PromptPay QR Codes */}
                        <div className="space-y-4 mb-6">
                            {promptPayNumbers.map((pp, index) => (
                                <div key={index} className="border-2 border-primary rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="badge badge-primary mb-2">{pp.label}</div>
                                            <div className="text-2xl font-bold">{pp.number}</div>
                                            <div className="text-sm opacity-70">{pp.name}</div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg flex justify-center items-center">
                                        {/* Placeholder for QR Code */}
                                        <div className="text-center">
                                            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                                                <span className="text-sm text-gray-500">QR Code PromptPay<br/>{pp.number}</span>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                                สแกนเพื่อจ่ายผ่าน Mobile Banking
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ข้อมูลติดต่อ */}
                        <div className="alert alert-warning mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <h3 className="font-bold">สำคัญ!</h3>
                                <div className="text-sm">
                                    หลังจากโอนเงินแล้ว กรุณาส่งหลักฐานการโอนมาที่:<br/>
                                    📱 LINE: @rungroj<br/>
                                    ☎️ โทร: 086-634-8619, 096-363-8519<br/>
                                    📧 Email: rungrojcarrentudon@gmail.com
                                </div>
                            </div>
                        </div>

                        {/* ปุ่มดำเนินการต่อ */}
                        <div className="card-actions flex flex-col gap-3">
                            {!paymentConfirmed ? (
                                <button 
                                    onClick={handlePaymentConfirm}
                                    className="btn btn-primary w-full"
                                >
                                    ฉันได้โอนเงินเรียบร้อยแล้ว
                                </button>
                            ) : (
                                <>
                                    <div className="alert alert-success">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>ขอบคุณ! กรุณารอการยืนยันจากทีมงาน</span>
                                    </div>
                                    <Link href="/customer/bookings" className="btn btn-outline w-full">
                                        ดูการจองของฉัน
                                    </Link>
                                </>
                            )}
                            <Link href="/customer/cars" className="btn btn-ghost w-full">
                                กลับไปหน้ารถเช่า
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
