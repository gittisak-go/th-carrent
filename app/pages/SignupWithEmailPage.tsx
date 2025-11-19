'use client'
import React, {useEffect, useActionState} from "react";
import Turnstile, {useTurnstile} from 'react-turnstile'
import TextBox from "@/app/components/TextBox";
import Link from "next/link";
import {LeftArrowIcon, LoginIcon} from "@/app/icons";
import {signupAdminWithEmail, signupCustomerWithEmail} from "@/app/auth/signupActions";
import {FormSubmitButton} from "@/app/components/FormSubmitButton";
import {useTheme} from "next-themes";
import {toast} from "react-toastify";
import LogoLink from "@/app/components/LogoLink";
import PasswordTextBox from "@/app/components/PasswordTextBox";

/**
 * Signup with email form component.
 * @param isAdmin whether this page is for admins or customers, redirection links will get set properly depending on this property.
 */
export default function SignupWithEmailPage({isAdmin}: { isAdmin: boolean })
{
    const turnstile = useTurnstile();
    const theme = useTheme();

    const [state, signupAction, isPending] =
        useActionState(isAdmin ? signupAdminWithEmail : signupCustomerWithEmail, {
            data: {
                email: '',
                password: '',
                username: '',
            },
            error: ''
        })

    // Show an error toast if there's errors, also reset the captcha.
    useEffect(() =>
    {
        if (!state.error) return;
        toast.error(state.error)
        turnstile.reset();
    }, [state, turnstile]);

    return (
        <form action={signupAction}
              id="signup-form"
              autoComplete='on'
              className="flex flex-col w-full py-8 px-2 sm:px-8 my-auto min-h-screen h-full gap-7 justify-center relative scale-95 z-[1] animate-appear">

            <Link href={`/auth/${isAdmin ? 'admin' : 'customer'}/signup`} title='Back'
                  className='absolute left-3 top-3 text-sm'><LeftArrowIcon/></Link>

            <LogoLink/>

            <h1 className='text-2xl text-center'>Sign up</h1>

            <div className='flex flex-col gap-4'>
                <TextBox label='Email' type='email' id='email' placeholder='kinangh98@gmail.com'
                         defaultValue={state.data.email}/>
                <PasswordTextBox label='Password' id='password' placeholder='*****'
                         defaultValue={state.data.password}/>
                <TextBox label='User Name' type='text' id='username' placeholder='Ahmad Kinan'
                         defaultValue={state.data.username}/>
                <Turnstile theme={theme.resolvedTheme === 'dark' ? 'dark' : 'light'} size='flexible'
                           sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY as string}/>
                <FormSubmitButton text='Sign up' isPending={isPending} icon={<LoginIcon/>}/>

                <span className='text-sm'>Already have an account? <Link
                    href={isAdmin ? '/auth/admin/login' : '/auth/customer/login'}
                    className='link link-primary link-hover font-medium'>Log in</Link></span>

                <span className='text-xs'>By signing up, you agree to our <a
                    className='link link-primary link-hover font-medium' href={`/privacy-policy`}>Privacy Policy</a>.</span>
            </div>
        </form>
    );
}