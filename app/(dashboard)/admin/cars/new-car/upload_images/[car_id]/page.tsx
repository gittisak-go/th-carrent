import UploadNewCarImagesPageContent
    from "@/app/(dashboard)/admin/cars/new-car/upload_images/[car_id]/UploadNewCarImagesPageContent";
import {use} from "react";

export const metadata = {
    title: 'Add New Car: Images | th-carrent - Admin',
    description: 'Upload images of your car within the th-carrent admin panel.',
};

export default function UploadNewCarImagesPage({params}: { params: Promise<{ car_id: string }> })
{
    const {car_id} = use(params);
    return <UploadNewCarImagesPageContent car_id={car_id}/>
}