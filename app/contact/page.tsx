import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import { mockLocations } from "@/lib/data/mockLocations";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'ติดต่อเรา - รุ่งโรจน์ คาร์เร้นท์ อุดรธานี',
    description: 'ติดต่อเราได้ที่สาขาหลักหรือสาขาสนามบิน บริการรถเช่าคุณภาพ ราคาย่อมเยา',
};

export default function ContactPage() {
    const mainBranch = mockLocations.find(loc => loc.isMain);
    const airportBranch = mockLocations.find(loc => !loc.isMain);

    return (
        <>
            <NavBar position="fixed" />
            
            <main className="min-h-screen pt-24 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">ติดต่อเรา</h1>
                        <p className="text-xl text-base-content/70">
                            รุ่งโรจน์ คาร์เร้นท์ อุดรธานี - บริการรถเช่าคุณภาพ
                        </p>
                    </div>

                    {/* สาขาหลัก */}
                    <div className="mb-16">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-3xl text-primary mb-4">
                                    📍 {mainBranch?.nameTh}
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">ที่อยู่:</h3>
                                            <p className="text-base-content/80">{mainBranch?.address}</p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">โทรศัพท์:</h3>
                                            <a href={`tel:${mainBranch?.phone.replace(/-/g, '')}`} 
                                               className="link link-primary text-lg">
                                                {mainBranch?.phone}
                                            </a>
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">ติดต่อผ่าน:</h3>
                                            <div className="flex flex-col gap-2">
                                                <a href="https://facebook.com/RungrojCarRental" 
                                                   target="_blank" 
                                                   rel="noopener"
                                                   className="link link-hover">
                                                    📘 Facebook: RungrojCarRental
                                                </a>
                                                <a href="https://page.line.me/rungroj" 
                                                   target="_blank" 
                                                   rel="noopener"
                                                   className="link link-hover">
                                                    💚 LINE: @rungroj
                                                </a>
                                                <a href="mailto:rungrojcarrentudon@gmail.com" 
                                                   className="link link-hover">
                                                    📧 rungrojcarrentudon@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">แผนที่:</h3>
                                        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                                            <iframe 
                                                src={mainBranch?.mapEmbed}
                                                width="100%" 
                                                height="100%" 
                                                style={{border:0}} 
                                                allowFullScreen 
                                                loading="lazy" 
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="แผนที่สาขาหลัก"
                                            />
                                        </div>
                                        <a href={mainBranch?.mapUrl} 
                                           target="_blank" 
                                           rel="noopener"
                                           className="btn btn-outline btn-sm mt-2 w-full">
                                            🗺️ เปิดใน Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* สาขาสนามบิน */}
                    <div className="mb-16">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-3xl text-secondary mb-4">
                                    ✈️ {airportBranch?.nameTh}
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">บริการ:</h3>
                                            <p className="text-base-content/80">{airportBranch?.address}</p>
                                            <p className="text-base-content/80 mt-2">
                                                🚗 รับ-ส่งรถที่สนามบิน<br/>
                                                ⏰ บริการตลอด 24 ชั่วโมง<br/>
                                                🎯 จองล่วงหน้าเพื่อรับบริการที่ดีที่สุด
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">โทรศัพท์:</h3>
                                            <a href={`tel:${airportBranch?.phone.replace(/-/g, '')}`} 
                                               className="link link-secondary text-lg">
                                                {airportBranch?.phone}
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">ตำแหน่งสนามบิน:</h3>
                                        <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                                            <iframe 
                                                src={airportBranch?.mapEmbed}
                                                width="100%" 
                                                height="100%" 
                                                style={{border:0}} 
                                                allowFullScreen 
                                                loading="lazy" 
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="แผนที่สาขาสนามบิน"
                                            />
                                        </div>
                                        <a href={airportBranch?.mapUrl} 
                                           target="_blank" 
                                           rel="noopener"
                                           className="btn btn-outline btn-sm mt-2 w-full">
                                            🗺️ เปิดใน Google Maps
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ข้อมูลเพิ่มเติม */}
                    <div className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h3 className="font-bold">💡 เคล็ดลับ</h3>
                            <div className="text-sm">
                                จองรถล่วงหน้าเพื่อรับส่วนลดพิเศษ! ติดต่อเราผ่าน LINE หรือโทรศัพท์ได้เลย
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
