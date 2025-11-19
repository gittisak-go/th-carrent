'use client'
import ProviderButton from "../components/ProviderButton";
import React from "react";
import Link from "next/link";
import {toast} from "react-toastify";
import {GoogleLogo, AppleLogo, FacebookLogo, EnvelopeIcon} from '../icons';
import LogoLink from "@/app/components/LogoLink";
import {createClient} from "@/lib/supabase/client";

/**
 * Signup form component.
 * @param isAdmin whether this page is for admins or customers, redirection links will get set properly depending on this property.
 */
export default function SignupPage({isAdmin}: { isAdmin: boolean })
{
    const handleOAuthSignIn = async () =>
    {
        const supabase = createClient();
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL + (isAdmin ? 'admin' : 'customer')},
        });

        if (error) toast.error(error.message);
    }

    return (
        <div
            className="flex flex-col w-full py-8 px-4 sm:px-10 my-auto min-h-screen h-full gap-12 pt-24 relative animate-appear">

            <LogoLink/>

            <h1 className='z-10 text-2xl text-center'>Sign up</h1>

            <div className='flex items-center justify-center gap-4'>
                <ProviderButton icon={<GoogleLogo/>} onClickHandler={handleOAuthSignIn}/>
                <ProviderButton icon={<FacebookLogo/>}
                                onClickHandler={() => toast('Facebook accounts will be supported soon.')}/>
                <ProviderButton icon={<AppleLogo/>}
                                onClickHandler={() => toast('Apple accounts will be supported soon.')}/>
            </div>

            <div className="divider">OR</div>

            <div className='z-10 flex flex-col gap-4'>
                <Link href={isAdmin ? '/auth/admin/signup-with-email/' : '/auth/customer/signup-with-email/'}
                      className='btn btn-primary'>
                    <span>Continue With Email</span>
                    <EnvelopeIcon/>
                </Link>
                <span className='text-sm'>Already have an account? <Link
                    href={isAdmin ? '/auth/admin/login' : '/auth/customer/login'}
                    className='link link-primary link-hover font-medium'>Log in</Link></span>
                <span className='text-xs'>By signing up, you agree to our <a
                    className='link link-primary link-hover font-medium'
                    href={`/privacy-policy`}>Privacy Policy</a>.</span>
            </div>
        </div>
    );
}