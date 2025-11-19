'use server'
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {Car} from "@/lib/types/models";

export async function addNewCar(newCarData: Car)
{
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser()

    const {data, error} = await supabase.schema('elite_rentals')
        .from("cars").insert({
            owner_id: user!.id,
            ...newCarData
        }).select();

    if (!error && data) redirect(`/admin/cars/new-car/upload_images/${data[0].id}/`)
    
    return error ? {error} : {success: true};
}
