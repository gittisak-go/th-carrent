/**
 * Mock Location Data - ข้อมูลสาขารถเช่า
 * รุ่งโรจน์ คาร์เร้นท์ อุดรธานี
 */

export interface Location {
    id: number;
    name: string;
    nameTh: string;
    address: string;
    phone: string;
    mapUrl: string;
    mapEmbed: string;
    isMain?: boolean;
}

export const mockLocations: Location[] = [
    {
        id: 1,
        name: 'Main Branch',
        nameTh: 'สาขาหลัก - รุ่งโรจน์ คาร์เร้นท์',
        address: '12/6 หมู่ 7 ตำบลหมากแข้ง อำเภอเมืองอุดรธานี จังหวัดอุดรธานี',
        phone: '086-634-8619',
        mapUrl: 'https://maps.app.goo.gl/bocrY5mAt...',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d121819.98715495446!2d102.7365875!3d17.4178047!3m2!1i1024!2i768!4f13.1!2m1!1z4Lij4Li44LmI4LiH4LmC4Lij4LiI4LiZ4LmMIOC4hOC4suC4o-C5jOC5gOC4o-C5ieC4meC4l-C5jCDguK3guLjguJTguKPguJjguLLguJnguLU!5e0!3m2!1sen!2sth!4v1763577637157!5m2!1sen!2sth',
        isMain: true,
    },
    {
        id: 2,
        name: 'Airport Branch',
        nameTh: 'สาขาสนามบิน - รุ่งโรจน์ คาร์เร้นท์',
        address: 'สนามบินอุดรธานี จังหวัดอุดรธานี',
        phone: '086-634-8619',
        mapUrl: 'https://maps.app.goo.gl/bocrY5mAt...',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.8247891234567!2d102.78765!3d17.38654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzExLjUiTiAxMDLCsDQ3JzE1LjUiRQ!5e0!3m2!1sen!2sth!4v1234567890123!5m2!1sen!2sth',
        isMain: false,
    },
];

export const getMainLocation = () => mockLocations.find(loc => loc.isMain);
export const getAirportLocation = () => mockLocations.find(loc => !loc.isMain);
export const getAllLocations = () => mockLocations;
