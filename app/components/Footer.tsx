import Link from "next/link";
import LogoLink from "@/app/components/LogoLink";
import { mockLocations } from "@/lib/data/mockLocations";

export default function Footer() {
    const mainBranch = mockLocations.find(loc => loc.isMain);
    
    return (
        <footer className="footer bg-base-200 text-base-content p-10">
            <aside>
                <LogoLink href={'/'} size='md'/>
                <div className='text-sm'>
                    <div className='font-semibold'>Rungroj Car Rental | รถเช่าอุดรธานี รุ่งโรจน์ คาร์เร้นท์</div>
                    <div className="mt-2">
                        <div className="font-semibold">📍 สาขาหลัก:</div>
                        <div>{mainBranch?.address}</div>
                        <div>☎️ โทร: {mainBranch?.phone}</div>
                    </div>
                    <div className="mt-2">
                        <div className="font-semibold">✈️ สาขาสนามบิน:</div>
                        <div>บริการรับ-ส่ง สนามบินอุดรธานี</div>
                        <div>☎️ โทร: 086-634-8619</div>
                    </div>
                    <a className='link link-hover mt-2 block' href="https://facebook.com/RungrojCarRental" target="_blank" rel="noopener">
                        📘 facebook.com/RungrojCarRental
                    </a>
                </div>
            </aside>
            <nav>
                <h6 className="footer-title">เมนู</h6>
                <Link href={'/'} className="link link-hover">หน้าแรก</Link>
                <Link href={'/customer/cars'} className="link link-hover">เช่ารถ</Link>
                <Link href={'/rental-terms'} className="link link-hover">เงื่อนไขการเช่า</Link>
                <Link href={'/contact'} className="link link-hover">ติดต่อเรา/สาขา</Link>
            </nav>
            <nav>
                <h6 className="footer-title">เกี่ยวกับ</h6>
                <a href={'https://www.canva.com/design/DAEQ9fb79b8/V5nJWy88hmShnBnUfleW2A/edit?utm_content=DAEQ9fb79b8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'} 
                   className="link link-hover" target="_blank" rel="noopener">เกี่ยวกับเรา</a>
                <a href={'mailto:rungrojcarrentudon@gmail.com'} className="link link-hover">อีเมลติดต่อ</a>
                <a href={'https://page.line.me/rungroj'} className="link link-hover" target="_blank" rel="noopener">LINE: @rungroj</a>
            </nav>
            <nav>
                <h6 className="footer-title">กฎหมาย/นโยบาย</h6>
                <Link href={`/privacy-policy`} className="link link-hover">นโยบายความเป็นส่วนตัว</Link>
            </nav>
        </footer>
    );
}