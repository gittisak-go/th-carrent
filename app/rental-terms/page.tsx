import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: 'เงื่อนไขการเช่า | รุ่งโรจน์ คาร์เร้นท์',
    description: 'เงื่อนไขการเช่ารถและข้อมูลที่จำเป็นสำหรับการเช่ารถกับรุ่งโรจน์ คาร์เร้นท์',
};

export default function RentalTermsPage() {
    return (
        <>
            <NavBar position="fixed" />
            
            <main className="container mx-auto px-4 py-24 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">เงื่อนไขการเช่ารถ</h1>
                    
                    {/* หลักฐานที่ต้องใช้ */}
                    <section className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-primary mb-4">
                                📋 หลักฐานการเช่ารถ
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-primary font-bold">1.</span>
                                    <span>บัตรประชาชน (ต้องไม่หมดอายุ)</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-primary font-bold">2.</span>
                                    <span>ใบขับขี่ (ต้องไม่หมดอายุ)</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-primary font-bold">3.</span>
                                    <span>สำเนาทะเบียนบ้าน</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-primary font-bold">4.</span>
                                    <span>หลักฐานการทำงาน (สลิปเงินเดือน/บัตรพนักงาน/หนังสือรับรอง)</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* เงินมัดจำ */}
                    <section className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-primary mb-4">
                                💰 เงินมัดจำ
                            </h2>
                            <div className="space-y-4">
                                <div className="alert alert-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <div>
                                        <h3 className="font-bold">รถทั่วไป (เก๋ง, SUV, มินิแวน)</h3>
                                        <div className="text-lg font-semibold">วางเงินมัดจำ 3,000 บาท</div>
                                    </div>
                                </div>
                                
                                <div className="alert alert-warning">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-bold">รถพิเศษ (Pajero Sport / Xpander)</h3>
                                        <div className="text-lg font-semibold">วางเงินมัดจำ 5,000 - 10,000 บาท</div>
                                    </div>
                                </div>

                                <div className="divider">หรือ</div>

                                <div className="bg-base-200 p-4 rounded-lg">
                                    <h3 className="font-bold mb-2">🏠 รับลงทะเบียนสกุลบ้านมัดจำ</h3>
                                    <p className="text-sm">บริการเต็มรูปแบบ ไม่ต้องรอข้ามวัน</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* การจองรถ */}
                    <section className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-primary mb-4">
                                📱 การจองรถล่วงหน้า
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="badge badge-primary">ขั้นตอน 1</span>
                                    <span>โอนเงินจอง 500-1,000 บาท</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="badge badge-primary">ขั้นตอน 2</span>
                                    <span>ส่งหลักฐานการโอนเงินทาง LINE: @rungroj</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="badge badge-primary">ขั้นตอน 3</span>
                                    <span>รับการยืนยันจากทีมงาน</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="badge badge-success">เสร็จสิ้น</span>
                                    <span>รับรถได้ทันที ตามวันเวลาที่นัดหมาย</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* บริการพิเศษ */}
                    <section className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-primary mb-4">
                                ✨ บริการพิเศษ
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                    <span className="text-3xl">🚗</span>
                                    <div>
                                        <h3 className="font-bold">ส่งรถถึงบ้านฟรี!</h3>
                                        <p className="text-sm">ภายในพื้นที่อีสานตอนบน (อุดรธานี และจังหวัดใกล้เคียง)</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                    <span className="text-3xl">📅</span>
                                    <div>
                                        <h3 className="font-bold">เช่ารายวัน / สัปดาห์ / เดือน</h3>
                                        <p className="text-sm">มีรูปแบบการเช่าที่ยืดหยุ่นตามความต้องการ</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                    <span className="text-3xl">✈️</span>
                                    <div>
                                        <h3 className="font-bold">บริการรับ-ส่ง สนามบินอุดรธานี</h3>
                                        <p className="text-sm">สะดวกสบาย ไม่ต้องกังวลเรื่องการเดินทาง</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                    <span className="text-3xl">⚡</span>
                                    <div>
                                        <h3 className="font-bold">รับรถได้ทันที</h3>
                                        <p className="text-sm">ไม่ต้องรอนาน เอกสารครบ รับรถได้เลย</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ข้อมูลติดต่อ */}
                    <section className="card bg-primary text-primary-content shadow-xl mb-8">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                📞 ติดต่อเรา
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-bold mb-2">เบอร์โทรศัพท์</h3>
                                    <p>☎️ 086-634-8619</p>
                                    <p>☎️ 096-363-8519</p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">โซเชียลมีเดีย</h3>
                                    <p>📱 LINE: @rungroj</p>
                                    <p>📘 Facebook: RungrojCarRental</p>
                                    <p>🎵 TikTok: @rungrojcarrent</p>
                                    <p>📺 YouTube: @RungrojCarRental</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* หมายเหตุ */}
                    <div className="alert alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                            <h3 className="font-bold">หมายเหตุ</h3>
                            <p className="text-sm">
                                เงื่อนไขการเช่าอาจมีการเปลี่ยนแปลงตามความเหมาะสม 
                                กรุณาติดต่อสอบถามเพิ่มเติมก่อนทำการจอง
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
