import { redirect } from "next/navigation";
import { Car } from "@/lib/types/models";
import { rentTimes } from "@/lib/types/rentTimes";
import PromptPayPaymentContent from "./PromptPayPaymentContent";

export const metadata = {
    title: 'ชำระเงินด้วย PromptPay | th-carrent',
    description: 'สแกน QR Code เพื่อชำระค่าเช่ารถผ่านแอปพลิเคชันธนาคาร',
};

type searchParamsType = {
    searchParams: Promise<{
        car: string;
        rentDate: string;
        deliveryLocation: string;
        paymentId: string;
    }>;
};

export default async function PromptPayPaymentPage({ searchParams }: searchParamsType) {
    const {
        car: carJSON,
        rentDate: rentDateJSON,
        deliveryLocation: deliveryLocationJSON,
        paymentId
    } = await searchParams;

    if (!carJSON || !rentDateJSON || !deliveryLocationJSON || !paymentId) {
        redirect("/customer/");
    }

    const car = JSON.parse(decodeURIComponent(carJSON)) as Car;
    const rentDate = JSON.parse(rentDateJSON);
    const deliveryLocation = JSON.parse(deliveryLocationJSON);

    const pickupDates = rentDate['pickup-date'].split('-');
    const pickupTime = rentTimes.find((time) => time.value == rentDate['pickup-time'])?.label;

    // Calculate total days
    const startDate = new Date(pickupDates[0]);
    const endDate = new Date(pickupDates[1]);
    const rentDaysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const totalAmount = car.price_per_day * rentDaysCount;

    return (
        <PromptPayPaymentContent
            car={car}
            rentDate={rentDate}
            deliveryLocation={deliveryLocation}
            paymentId={paymentId}
            totalAmount={totalAmount}
            rentDaysCount={rentDaysCount}
            pickupDates={pickupDates}
            pickupTime={pickupTime || ''}
        />
    );
}
