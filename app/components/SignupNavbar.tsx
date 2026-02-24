import React from 'react';
import Link from 'next/link';


type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    
    return <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 '>
            <Link href="/" className="cursor-pointer flex items-center justify-center h-20 ">
                <img src="/logo.png" alt='FixMyLogic' className='h-full'/>
            </Link>
        <div className="flex items-center">
            <Link href={"/auth/signin"}>
            <button className='cursor-pointer bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out'>Sign In</button>
            </Link>
            
        </div>
        </div>
}
export default Navbar;