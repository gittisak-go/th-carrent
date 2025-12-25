'use client'
import {createClient} from "@/lib/supabase/client";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {FilePond, registerPlugin} from 'react-filepond';
import {FilePondFile} from "filepond";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {useRouter} from "next/navigation";
import {FormSubmitButton} from "@/app/components/FormSubmitButton";
import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

export default function UploadNewCarImagesPageContent({car_id}: {  car_id: string})
{
    const supabase = createClient();
    const [isPending, setIsPending] = useState(false)
    const [images, setImages] = useState<FilePondFile[]>([]);
    const router = useRouter();

    const uploadImages = async () =>
    {
        const imageUrls = [];

        for (const file of images)
        {
            // Generate a unique id.
            const fileName = Math.random().toString(16).slice(2) + file.file.name;
            const {error} = await supabase
                .storage
                .from("cars")
                .upload(fileName, file.file);

            if (error)
            {
                console.error("Error uploading file:", error);
                return [];
            }

            // Get the public URL for this newly added image.
            const {data: {publicUrl}} = supabase
                .storage
                .from("cars")
                .getPublicUrl(fileName);

            imageUrls.push(publicUrl);
        }

        return imageUrls;
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setIsPending(true);

        if (images.length <= 0)
        {
            toast.error("Please upload at least one image of your car.");
            setIsPending(false);
            return;
        }

        const imageUrls = await uploadImages();

        if (imageUrls.length <= 0)
        {
            toast.error("Image upload failed.");
            setIsPending(false);
            return;
        }

        // Update the newly created car images url column.
        const {error} = await supabase
            .from('cars')
            .update({img_urls: imageUrls})
            .eq('id', Number(car_id));

        if (error)
            toast.error(error.message);
        else
        {
            toast.success("Car added successfully.");
            router.replace('/admin/cars/')
        }

        setIsPending(false);
    }

    return (
        <div className='flex flex-col justify-center items-center py-10 px-4 md:px-8 lg:px-14'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-xl'>

                <ul className="steps">
                    <li className="step step-primary">Details</li>
                    <li className="step step-primary">Images</li>
                    <li className="step">Done!</li>
                </ul>

                <FilePond acceptedFileTypes={['image/*']} onupdatefiles={setImages} instantUpload={false}
                          allowMultiple={true} maxFiles={3} disabled={isPending} className='mt-12'
                          labelIdle={'Drag & Drop your car images or <span class="filepond--label-action"> Browse </span>'}/>
                <FormSubmitButton text='Upload' isPending={isPending}/>
            </form>
        </div>
    );
}