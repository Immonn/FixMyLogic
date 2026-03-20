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
    return <div className='relative h-20 min-h-20 w-full bg-linear-to-b from-gray-600 to-black'>
        <div className='absolute left-2 sm:left-12 md:left-24 top-1/2 -translate-y-1/2 h-full flex pointer-events-none select-none items-center justify-center'>
            <img src="/logo.png" alt='FixMyLogic' className='h-16 w-auto object-contain' />
        </div>

        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='flex items-center gap-4 pointer-events-auto'>
                <div className='flex bg-white items-center justify-center rounded dark-fill-3 hover:text-brand-orange h-8 w-8 cursor-pointer'>
                    <FaChevronLeft/>
                </div>
                <Link href={"/patternwise"} className='flex items-center gap-2 font-medium max-w-42.5 text-dark-gray-8 cursor-pointer hover:text-brand-orange'>
                <div>
                    <BsList/>
                </div>
                <p>Problem List</p>
               
                </Link>
                <div className='flex items-center justify-center rounded bg-white hover:text-brand-orange h-8 w-8 cursor-pointer'>
                    <FaChevronRight/>
                </div>
            </div>
        </div>

        <div className="absolute right-2 sm:right-12 md:right-24 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <div className='w-40 flex justify-end'>
            <Timer/>
        </div>
            <Link href={"/auth/signup"}>
                <button className='cursor-pointer border border-gray-300 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white transition duration-300 ease-in-out'>Buymeacoffee</button>
            </Link>
            <div className='w-8 h-8 shrink-0'>
                {user ? (
                    <div className='cursor-pointer group relative w-full h-full'>
                        <img src='/avatar.png' alt='Avatar' className='rounded-full w-full h-full object-cover' />
                        <div
                            className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
							z-40 group-hover:scale-100 scale-0 
							transition-all duration-300 ease-in-out'
                        >
                            <p className='text-sm'>{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-full rounded-full border border-gray-500/70' />
                )}
            </div>
        </div>
    </div>
}
export default ProblemNavBar;