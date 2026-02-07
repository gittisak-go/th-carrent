import UploadNewCarImagesPageContent
    from "@/app/(dashboard)/admin/cars/new-car/upload_images/[car_id]/UploadNewCarImagesPageContent";
import {use} from "react";

export const metadata = {
    title: 'Add New Car: Images | Rungroj CarRental - Admin',
    description: 'Upload images of your car within the Rungroj CarRental admin panel.',
};

export default function UploadNewCarImagesPage({params}: { params: Promise<{ car_id: string }> })
{
    const {car_id} = use(params);
    return <UploadNewCarImagesPageContent car_id={car_id}/>
}