/**
 * Mock Car Data for Static Demo
 * ข้อมูลรถสำหรับแสดงหน้าเว็บแบบ static (ไม่ต้องใช้ database)
 * ข้อมูลจาก: https://github.com/rungrojcarrent/car-rental
 */

import { Car } from '@/lib/types/models'

export const mockCars: Car[] = [
    {
        id: 1,
        manufacturer: 'Honda',
        model: 'City Turbo',
        type_id: 8,
        type_display: 'เก๋ง',
        price_per_day: 1000,
        fuel: 2, // Petrol
        seats: 5,
        color: '#000000',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/HondaCityTurbo-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 4,
    },
    {
        id: 2,
        manufacturer: 'Toyota',
        model: 'New Yaris Sport',
        type_id: 7,
        type_display: 'แฮทช์แบค',
        price_per_day: 800,
        fuel: 2,
        seats: 5,
        color: '#FF0000',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/NewYarisSport-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 5,
    },
    {
        id: 3,
        manufacturer: 'Toyota',
        model: 'New Yaris Ativ',
        type_id: 8,
        type_display: 'เก๋ง',
        price_per_day: 1000,
        fuel: 2,
        seats: 5,
        color: '#FFFFFF',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/NewYarisAtiv-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 4,
    },
    {
        id: 4,
        manufacturer: 'Nissan',
        model: 'Almera Sportech',
        type_id: 8,
        type_display: 'เก๋ง',
        price_per_day: 800,
        fuel: 2,
        seats: 5,
        color: '#666666',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/NissanAlmeraSportech-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 4,
    },
    {
        id: 5,
        manufacturer: 'Suzuki',
        model: 'Ciaz',
        type_id: 8,
        type_display: 'เก๋ง',
        price_per_day: 800,
        fuel: 2,
        seats: 5,
        color: '#0026ff',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/SuzukiCiaz-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 4,
    },
    {
        id: 6,
        manufacturer: 'Ford',
        model: 'Ranger Raptor',
        type_id: 3,
        type_display: 'กระบะ',
        price_per_day: 2500,
        fuel: 1, // Diesel
        seats: 4,
        color: '#FF6600',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/FordRangerRaptor-2.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 4,
    },
    {
        id: 7,
        manufacturer: 'Toyota',
        model: 'Vigo Champ',
        type_id: 3,
        type_display: 'กระบะ',
        price_per_day: 2000,
        fuel: 1,
        seats: 4,
        color: '#FFFFFF',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/ToyotaVigoChamp-2.png'
        ],
        transmission: 'ธรรมดา',
        doors: 4,
    },
    {
        id: 8,
        manufacturer: 'Toyota',
        model: 'Veloz',
        type_id: 4,
        type_display: 'มินิแวน',
        price_per_day: 1800,
        fuel: 2,
        seats: 7,
        color: '#5e7b83',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/ToyotaVeloz-2.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 5,
    },
    {
        id: 9,
        manufacturer: 'Mitsubishi',
        model: 'Pajero Sport Elite Edition',
        type_id: 1,
        type_display: 'SUV',
        price_per_day: 2200,
        fuel: 1,
        seats: 7,
        color: '#000000',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/PajeroSportEliteEdition-2.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 5,
    },
    {
        id: 10,
        manufacturer: 'Mitsubishi',
        model: 'Cross',
        type_id: 1,
        type_display: 'SUV',
        price_per_day: 1800,
        fuel: 2,
        seats: 7,
        color: '#FFFFFF',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/MitsubishiCross-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 5,
    },
    {
        id: 11,
        manufacturer: 'Mitsubishi',
        model: 'Xpander',
        type_id: 4,
        type_display: 'มินิแวน',
        price_per_day: 1800,
        fuel: 2,
        seats: 7,
        color: '#5cb97c',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/MitsubishiXpander-5.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 5,
    },
    {
        id: 12,
        manufacturer: 'Isuzu',
        model: 'MU-X',
        type_id: 1,
        type_display: 'SUV',
        price_per_day: 1990,
        fuel: 1,
        seats: 7,
        color: '#FFFFFF',
        img_urls: [
            'https://raw.githubusercontent.com/rungrojcarrent/car-rental/main/src/images/cars-big/IsuzuMUX-1.png'
        ],
        transmission: 'อัตโนมัติ',
        doors: 5,
    },
]

export const mockCarTypes = [
    { value: 1, label: 'SUV' },
    { value: 2, label: 'รถบรรทุก' },
    { value: 3, label: 'กระบะ' },
    { value: 4, label: 'มินิแวน' },
    { value: 5, label: 'รถสปอร์ต' },
    { value: 6, label: 'รถเปิดประทุน' },
    { value: 7, label: 'แฮทช์แบค' },
    { value: 8, label: 'เก๋ง' },
    { value: 9, label: 'รถตู้' },
]

// ฟังก์ชันช่วยเหลือสำหรับดึงข้อมูลรถ
export const getFeaturedCars = () => {
    const cars = mockCars.filter(car => car.price_per_day >= 1500)
    return cars.map(car => ({
        ...car,
        type_display: mockCarTypes.find(t => t.value === car.type_id)?.label || ''
    }))
}

export const getRegularCars = () => {
    const cars = mockCars.filter(car => car.price_per_day < 1500)
    return cars.map(car => ({
        ...car,
        type_display: mockCarTypes.find(t => t.value === car.type_id)?.label || ''
    }))
}

export const getAllCars = () => {
    return mockCars.map(car => ({
        ...car,
        type_display: mockCarTypes.find(t => t.value === car.type_id)?.label || ''
    }))
}

// ฟังก์ชันสำหรับ Admin - ดึงรายการประเภทรถ
export const getCarTypes = () => {
    return mockCarTypes.map(type => ({
        value: type.value.toString(),
        label: type.label
    }))
}

// ฟอร์แมตราคาเป็นบาทไทย
export const formatThaiPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price)
}
