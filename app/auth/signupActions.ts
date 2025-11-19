'use server'
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'

type SignupFormData = {
    email: string,
    password: string,
    username: string,
}

type State = {
    data?: SignupFormData,
    error?: string
}

export async function signupAdminWithEmail(_prevState: State, formData: FormData)
{
    return await signupWithEmail(_prevState, formData, true);
}

export async function signupCustomerWithEmail(_prevState: State, formData: FormData)
{
    return await signupWithEmail(_prevState, formData, false);
}

async function signupWithEmail(_prevState: State, formData: FormData, isAdmin: boolean)
{
    const supabase = await createClient()
    const data = Object.fromEntries(formData) as SignupFormData;
    const captchaToken = formData.get('cf-turnstile-response') as string;

    const {error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            captchaToken: captchaToken,
            data: {
                display_name: data.username,
                role: isAdmin ? 'admin' : 'customer'
            }
        },
    })

    if (!error) redirect(isAdmin ? '/admin/' : '/customer/');

    if (error.code === 'user_already_exists')
    {
        const user = await supabase.auth.getUser();
        const userRole = user.data.user?.user_metadata.role;

        // Convert the role of the user to 'both' when a user from a specific
        // role tries to signup as a new user from the other role.
        if (isAdmin && userRole === 'customer' ||
            !isAdmin && userRole === 'admin')
        {
            const {error} = await supabase.auth.updateUser({data: {role: 'both'}})
            if (!error) redirect(isAdmin ? '/admin/' : '/customer/');
        }
    }

    // Return the form data with an error when an error happens during auth.
    return {
        data: data,
        error: error.message,
    }
}