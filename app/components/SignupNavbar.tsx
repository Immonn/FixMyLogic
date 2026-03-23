import React from 'react';
import Link from 'next/link';


type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return <div className='flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6'>
            <Link href="/" className="cursor-pointer flex items-center justify-center h-28 ">
                <img src="/logo.png" alt='FixMyLogic' className='h-full object-contain'/>
            </Link>
        <div className="flex items-center">
            <Link href={"/auth/signin"}>
            <div className='cursor-pointer border border-brand-orange bg-brand-orange/10 text-brand-orange px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-base sm:text-lg font-semibold
            hover:bg-brand-orange hover:text-white transition duration-300 ease-in-out'>Sign In</div>
            </Link>
            
        </div>
        </div>
}
export default Navbar;