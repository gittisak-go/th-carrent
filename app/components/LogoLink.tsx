import Link from "next/link";
import React from "react";

/**
 * A clickable link containing the website logo.
 * @param href the route to open (default is '/').
 * @param replace Whether to replace history or not (default to false).
 * @param className Class names for styling.
 * @param textSize Text sizing.
 * @constructor
 */
export default function LogoLink({href = '/', replace = false, className = '', size = 'lg'}: {
    href?: string,
    replace?: boolean,
    className?: string
    size?: 'sm' | 'md' | 'lg'
})
{
    return (
        <Link replace={replace} href={href} className={`flex items-center justify-center gap-2 group ${className}`}>
            <div className={`bg-[url('/images/logo-light.svg')] 
                            dark:bg-[url('/images/logo-dark.svg')]
                            group-hover:animate-bounce
                            ${size === 'sm' && 'size-6'}
                            ${size === 'md' && 'size-7'}
                            ${size === 'lg' && 'size-9'}`}/>

            <h1 className={`font-bold
                            ${size === 'sm' && 'text-xl'}
                            ${size === 'md' && 'text-2xl'}
                            ${size === 'lg' && 'text-4xl'} 
                            `}
                            >th-carrent</h1>
        </Link>
    );
}