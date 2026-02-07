import Link from "next/link";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from 'next/image';
import * as m from "framer-motion/m"
import user1 from '@/public/images/testimonials/user (1).jpg';
import user2 from '@/public/images/testimonials/user (2).jpg';
import user3 from '@/public/images/testimonials/user (3).jpg';
import HomePageFeaturedCarsCarousel from "@/app/(app)/HomePageFeaturedCarsCarousel";
import {Car} from "@/lib/types/models";
import {FaCarSide, FaHeadset, FaSackDollar} from "react-icons/fa6";
import {IconType} from "react-icons";
import {getFeaturedCars} from "@/lib/data/mockCars";

export const metadata = {
    title: 'Rungroj CarRental | ค้นหารถเช่าที่เหมาะกับคุณ',
    description: 'รถเช่าอุดรธานี รุ่งโรจน์ คาร์เร้นท์ - บริการรถเช่าคุณภาพ ราคาย่อมเยา',
};

// Animation Variants
const fadeInUp = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}},
};

const fadeInRight = {
    hidden: {opacity: 0, x: 15},
    visible: {opacity: 1, x: 0, transition: {duration: 0.8}},
};

const fadeIn = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.8}},
};

const stagger = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeInFromBottom = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}},
};

const fadeInFromLeft = {
    hidden: {opacity: 0, x: -50},
    visible: {opacity: 1, x: 0, transition: {duration: 0.8}},
};

const slideInFromRight = {
    hidden: {opacity: 0, x: 15},
    visible: {opacity: 1, x: 0, transition: {duration: 0.8}},
};

export default async function HomePage()
{
    // ใช้ข้อมูล mock สำหรับ demo (ไม่ต้องเชื่อมต่อ database)
    const featuredCars: Car[] = getFeaturedCars();

    return (
        <>
            <NavBar position="fixed"/>

            <main className="flex gap-16 flex-col justify-center">
                <div>
                    {/* Hero Section */}
                    <m.section
                        className="relative min-h-screen flex items-center bg-cover bg-center"
                        style={{backgroundImage: "url('/images/hero-background.jpg')"}}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Background Overlay */}
                        <m.div
                            className="absolute inset-0 bg-neutral bg-opacity-70 lg:bg-opacity-60 xl:bg-opacity-50"
                            variants={fadeIn}
                        />

                        {/* Text Content */}
                        <m.div
                            className="relative max-w-[650px] px-6 sm:pl-16 lg:pl-24 text-gray-200 py-20 pb-10"
                            variants={fadeInUp}
                        >
                            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
                                รถเช่าอุดรธานี<br/>รุ่งโรจน์ คาร์เร้นท์
                            </h1>
                            <p className="text-lg leading-relaxed mb-6">
                                บริการรถเช่าคุณภาพ ราคาย่อมเยา พร้อมส่งมอบประสบการณ์การเดินทางที่ดีที่สุดให้กับคุณ
                                ไม่ว่าจะเป็นทริปครอบครัว ธุรกิจ หรือการผจญภัย เรามีรถที่เหมาะสมรอคุณอยู่
                            </p>
                            <Link href={"/customer/cars"} className="btn btn-primary px-8 text-lg">
                                เช่ารถเลย
                            </Link>
                        </m.div>
                    </m.section>

                    {/* Stats Section */}
                    <section className="py-16 px-6 text-center bg-neutral text-neutral-content">
                        <h2 className="text-4xl  mb-12 font-bold">ผลงานของเรา</h2>
                        <m.div
                            className="stats stats-vertical md:stats-horizontal shadow w-full lg:w-3/4 mx-auto overflow-y-hidden"
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 'all', once: true}}
                        >
                            <m.div className="stat" variants={fadeInUp}>
                                <div className="stat-title">ลูกค้าพึงพอใจ</div>
                                <div className="stat-value text-primary">12K+</div>
                                <div className="stat-desc">ตั้งแต่ปี 2022</div>
                            </m.div>
                            <m.div className="stat" variants={fadeInUp}>
                                <div className="stat-title">รถในระบบ</div>
                                <div className="stat-value text-primary">1.5K</div>
                                <div className="stat-desc">ทั่วประเทศ</div>
                            </m.div>
                            <m.div className="stat" variants={fadeInUp}>
                                <div className="stat-title">การจองทั้งหมด</div>
                                <div className="stat-value text-primary">50K+</div>
                                <div className="stat-desc">ทุกสาขา</div>
                            </m.div>
                        </m.div>
                    </section>

                    {/* Why Choose Us Section */}
                    <m.section
                        className="py-16 px-6 bg-base-100 flex flex-col lg:flex-row gap-8 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{amount: 0.3, once: true}}
                        variants={stagger}
                    >
                        <m.div
                            className="text-center lg:text-right lg:w-1/2"
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl font-bold  mb-12 text-primary">
                                ทำไมต้องเลือกเรา
                            </h2>
                            <p className="text-lg">
                                We go above and beyond to provide you with an unforgettable experience. From competitive
                                pricing to our
                                vast selection of vehicles, here’s why we’re the trusted choice for car rentals.
                            </p>
                        </m.div>

                        <m.div
                            className="inline-flex gap-4 flex-col w-full lg:w-1/2 sm:items-center"
                            variants={stagger}
                        >
                            <WhyChooseUsItem
                                Icon={FaSackDollar}
                                title="ราคาย่อมเยา"
                                description="เข้าถึงรถคุณภาพในราคาที่เหมาะกับงบประมาณของคุณ เราเชื่อว่ารถดีไม่จำเป็นต้องแพง"
                            />

                            <WhyChooseUsItem
                                Icon={FaCarSide}
                                title="รถหลากหลาย"
                                description="เลือกจากรถเก๋ง, SUV และอื่นๆ จากผู้ให้บริการที่เชื่อถือได้ เรามีรถสำหรับทุกความต้องการและทุกจุดหมาย"
                                className="sm:ml-16"
                            />

                            <WhyChooseUsItem
                                Icon={FaHeadset}
                                title="บริการตลอด 24/7"
                                description="เราพร้อมช่วยเหลือคุณทุกเมื่อ ทุกที่ ความพึงพอใจและความสะดวกสบายของคุณคือสิ่งสำคัญที่สุดสำหรับเรา"
                                className="sm:ml-8"
                            />
                        </m.div>
                    </m.section>

                    {/* Featured Cars Section */}
                    <section className="px-6 py-16">
                        <h2 className="text-4xl mb-8 font-bold text-center">
                            รถแนะนำ
                        </h2>
                        <p className="text-lg mb-8 text-center">
                            ✦ รถคุณภาพที่คัดสรรอย่างดี ผสมผสานความหรูหรา สไตล์ และประสิทธิภาพ ✦
                        </p>
                        <HomePageFeaturedCarsCarousel cars={featuredCars}/>
                    </section>

                    {/* Testimonials Section - ย้ายขึ้นไปใกล้ Testimonials Section */}
                </div>

                {/* Testimonials Section */}
                <m.section
                    className="py-4 px-6"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                >
                    <m.h2
                        className="text-4xl font-bold text-center  mb-12 text-primary"
                        variants={fadeInFromBottom}
                    >
                        ลูกค้าของเราพูดถึงเรา
                    </m.h2>
                    <m.p
                        className="text-lg mb-8 text-center"
                        variants={fadeInFromBottom}
                    >
                        เราภูมิใจที่มอบบริการชั้นยอดและทำให้การเช่ารถเป็นประสบการณ์ที่น่าประทับใจ
                        ฟังสิ่งที่ลูกค้าที่พึงพอใจของเราพูด!
                    </m.p>
                    <m.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={stagger}
                    >
                        {[
                            {
                                name: "คุณสมชาย",
                                feedback: "บริการดีมาก เช่ารถง่าย สะดวกสบาย!",
                                image: user1,
                            },
                            {
                                name: "คุณสมศรี",
                                feedback: "รถสวย ราคาดี บริการเยี่ยม!",
                                image: user2,
                            },
                            {
                                name: "คุณประยุทธ์",
                                feedback: "แนะนำเลย! บริการดี ไม่มีปัญหา น่าเชื่อถือ",
                                image: user3,
                            },
                        ].map(({name, feedback, image}, index) => (
                            <m.div
                                key={index}
                                className="card w-full bg-base-100 shadow-xl"
                                variants={fadeInFromBottom}
                            >
                                <div className="card-body">
                                    <div
                                        className="flex md:flex-col md:text-center lg:flex-row lg:text-left gap-4 items-center">
                                        <Image
                                            src={image}
                                            height={60}
                                            width={60}
                                            alt={name}
                                            className="rounded-full w-16 h-16"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold">{name}</h3>
                                            <p className="text-base">{feedback}</p>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </m.div>
                </m.section>

                {/* How It Works Section */}
                <m.section
                    className="py-20 px-6 bg-neutral"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                >
                    <m.h2
                        className="text-4xl font-semibold text-center  mb-12 text-primary"
                        variants={fadeInFromBottom}
                    >
                        วิธีการเช่า
                    </m.h2>
                    <m.ol
                        className="steps steps-vertical md:steps-horizontal mx-auto w-full text-neutral-content"
                        variants={stagger}
                    >
                        {["ค้นหา", "จอง", "ขับ"].map((step, index) => (
                            <m.li
                                key={index}
                                className="step step-primary"
                                variants={fadeInFromLeft}
                            >
                                {step}: {index === 0 && "เลือกดูรถที่มีให้บริการ"}
                                {index === 1 && "เลือกรถและทำการจองอย่างปลอดภัย"}
                                {index === 2 && "รับรถและออกเดินทาง!"}
                            </m.li>
                        ))}
                    </m.ol>
                </m.section>

                {/* CTA Section */}
                <m.section
                    className="pb-16 px-6 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    variants={stagger}
                >
                    <m.h2
                        className="text-4xl font-bold mb-6"
                        variants={fadeInFromBottom}
                    >
                        พร้อมจองรถของคุณแล้วหรือยัง?
                    </m.h2>
                    <m.p
                        className="text-lg mb-8"
                        variants={fadeInFromBottom}
                    >
                        อย่ารอช้า! ค้นหารถในฝันของคุณวันนี้และเริ่มต้นการผจญภัย
                    </m.p>
                    <m.div variants={slideInFromRight}>
                        <Link href={"/auth/customer/login/"} className="btn btn-primary px-8 text-lg">
                            เช่ารถเลย
                        </Link>
                    </m.div>
                </m.section>
            </main>

            <Footer/>
        </>
    );
}

function WhyChooseUsItem({className = '', Icon, title, description}: {
    className?: string,
    Icon: IconType,
    title: string,
    description: string
})
{
    return (
        <m.div
            className={`sm:w-4/5 h-full bg-primary rounded-2xl shadow-lg text-primary-content ${className}`}
            whileHover={{scale: 1.05}}
            variants={fadeInRight}
        >
            <div className="flex gap-6 items-center p-4">
                <Icon className="w-16 text-4xl shrink-0"/>
                <span>
          <h3 className="text-xl font-bold">{title}</h3>
          <p>{description}</p>
        </span>
            </div>
        </m.div>
    );
}