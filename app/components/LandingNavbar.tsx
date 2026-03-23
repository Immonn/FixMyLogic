import Link from 'next/link';
import React from 'react';


type NavbarProps = {
    
};

const LandingNavbar:React.FC<NavbarProps> = () => {
    
    return <div className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-6'>
        <div className="flex pointer-events-none select-none items-center justify-center h-28 ">
            <img src="/logo.png" alt='FixMyLogic' className='h-full object-contain'/>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
            <Link href={"/auth/signup"}>
            <button className='cursor-pointer border border-gray-300 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-base sm:text-lg font-semibold
            hover:text-brand-orange hover:bg-white hover:border-white hover:shadow-[0_0_15px_rgb(255,255,255,0.3)] transition-all duration-300 ease-in-out'>Create Account</button>
            </Link>
            <Link href={"/auth/signin"}>
            <div className='cursor-pointer border bg-brand-orange text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-base sm:text-lg font-semibold
            hover:bg-white hover:text-brand-orange transition duration-300 ease-in-out'>Sign In</div>
            </Link>
            
        </div>
        </div>
}
export default LandingNavbar;