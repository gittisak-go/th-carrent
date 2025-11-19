'use server'

import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

type LoginFormData = {
    email: string,
    password: string,
}

type State = {
    data?: LoginFormData,
    error?: string
}

export async function loginAdmin(_prevState: State, formData: FormData)
{
    return await login(_prevState, formData, true);
}

export async function loginCustomer(_prevState: State, formData: FormData)
{
    return await login(_prevState, formData, false);
}

async function login(_prevState: State, formData: FormData, isAdmin: boolean)
{
    const supabase = await createClient()
    const data = Object.fromEntries(formData) as LoginFormData;
    const captchaToken = formData.get('cf-turnstile-response') as string;

    const {error} = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
        options: {
            captchaToken: captchaToken,
        },
    })

    if (!error) redirect(isAdmin ? '/admin/' : '/customer/');

    // Return the form data with an error when an error happens during auth.
    return {
        data: data,
        error: error.message,
    }
}