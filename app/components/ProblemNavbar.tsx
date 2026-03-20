'use client'
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from './Timer';


type NavbarProps = {

};

const ProblemNavBar: React.FC<NavbarProps> = () => {
    const [user] = useAuthState(auth)
    return <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 bg-linear-to-b from-gray-600 to-black'>
        <div className="flex pointer-events-none select-none items-center justify-center h-20 ">
            <img src="/logo.png" alt='FixMyLogic' className='h-full' />
        </div>
        <div className='flex items-center gap-4 flex-1 justify-center'>
            <div className='flex bg-white items-center justify-center rounded dark-fill-3 hover:text-brand-orange h-8 w-8 cursor-pointer'>
                <FaChevronLeft/>
            </div>
            <Link href={"/patternwise"} className='flex items-center gap-2 font-medium `max-w-[170px]` text-dark-gray-8 cursor-pointer hover:text-brand-orange'>
            <div>
                <BsList/>
            </div>
            <p>Problem List</p>
           
            </Link>
            <div className='flex items-center justify-center rounded bg-white hover:text-brand-orange h-8 w-8 cursor-pointer'>
                <FaChevronRight/>
            </div>
        </div>
        <div className="flex items-center gap-3">
        <div>
            <Timer/>
        </div>
            <Link href={"/auth/signup"}>
                <button className='cursor-pointer border border-gray-300 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out'>Buymeacoffee</button>
            </Link>
            {user && (
                <div className='cursor-pointer group relative'>
                    <img src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full' />
                    <div
                        className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
                    >
                        <p className='text-sm'>{user.email}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
}
export default ProblemNavBar;