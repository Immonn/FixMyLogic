'use client'
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';


type NavbarProps = {

};

const DashboardNavbar: React.FC<NavbarProps> = () => {
    const [user] = useAuthState(auth)
    return <div className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 '>
        <div className="flex pointer-events-none select-none items-center justify-center h-20 ">
            <img src="/logo.png" alt='FixMyLogic' className='h-full' />
        </div>
        <div className="flex items-center gap-3">
            <Link href={"/auth/signup"}>
                <button className='cursor-pointer border border-gray-300 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out'>Buymeacoffee</button>
            </Link>
            {user && (
                <div className='cursor-pointer group relative'>
                    <img src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                    <div
                        className='absolute right-0 top-10 mt-2 origin-top-right rounded bg-dark-layer-1 p-2 text-brand-orange shadow-lg 
								z-50 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out'
                    >
                        <p className='max-w-60 text-sm whitespace-nowrap'>{user.email}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
}
export default DashboardNavbar;