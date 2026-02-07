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
            <img
                src="/images/logo-rungroj.png"
                alt="Rungroj CarRental"
                className={`object-contain bg-transparent
                            ${size === 'sm' && 'size-6'}
                            ${size === 'md' && 'size-8'}
                            ${size === 'lg' && 'size-10'}
                            group-hover:opacity-90 transition-opacity`}
            />
            <h1 className={`font-bold text-base-content
                            ${size === 'sm' && 'text-xl'}
                            ${size === 'md' && 'text-2xl'}
                            ${size === 'lg' && 'text-4xl'}
                            `}>
                Rungroj CarRental
            </h1>
        </Link>
    );
}