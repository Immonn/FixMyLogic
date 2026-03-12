import Link from 'next/link';
import React from 'react';


type NavbarProps = {
    
};

const DashboardNavbar:React.FC<NavbarProps> = () => {
    
    return <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 '>
        <div className="flex pointer-events-none select-none items-center justify-center h-20 ">
            <img src="/logo.png" alt='FixMyLogic' className='h-full'/>
        </div>
        <div className="flex items-center gap-3">
            <Link href={"/auth/signup"}>
            <button className='cursor-pointer border border-gray-300 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out'>Buymecoffe</button>
            </Link>
            <Link href={"/auth/signin"}>
            <div className='cursor-pointer border border-gray-300 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out'>Your Profile</div>
            </Link>
            
        </div>
        </div>
}
export default DashboardNavbar;