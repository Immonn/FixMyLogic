'use client'
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from './Timer';
import { useParams, useRouter } from "next/navigation";
import { problems } from '../utils/problems';
import { Problem } from '../utils/types';


type NavbarProps = {

};

const ProblemNavBar: React.FC<NavbarProps> = () => {
    const [user] = useAuthState(auth)
    const router = useRouter();
    const params = useParams();

    const handleProblemChange = (isForward: boolean) => {
        const order = problems[params.pid as string]?.order;
        if (order === undefined) return;
        
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = order + direction;
        const nextProblemKey = Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);
        
        if (isForward && !nextProblemKey) {
            const firstProblemKey = Object.keys(problems).find((key) => problems[key].order === 1) || Object.keys(problems)[0];
            router.push(`/problems/${firstProblemKey}`);
        } else if (!isForward && !nextProblemKey) {
            const lastProblemOrder = Object.keys(problems).length;
            const lastProblemKey = Object.keys(problems).find((key) => problems[key].order === lastProblemOrder) || Object.keys(problems)[Object.keys(problems).length - 1];
            router.push(`/problems/${lastProblemKey}`);
        } else if (nextProblemKey) {
            router.push(`/problems/${nextProblemKey}`);
        }
    }

    return <div className='relative z-40 h-14 min-h-14 w-full bg-dark-layer-1'>
        <Link href={"/patternwise"}>
        <div className='absolute left-2 sm:left-12 md:left-24 top-1/2 -translate-y-1/2 h-full flex items-center justify-center'>
            <img src="/logo.png" alt='FixMyLogic' className='h-10 w-auto object-contain' />
        </div>
        </Link>

        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='flex items-center gap-4 pointer-events-auto'>
                <div className='flex bg-white items-center justify-center rounded dark-fill-3 hover:text-brand-orange h-8 w-8 cursor-pointer'
                onClick={()=>handleProblemChange(false)}>
                    <FaChevronLeft/>
                </div>
                <Link href={"/patternwise"} className='flex items-center gap-2 font-medium max-w-42.5 text-dark-gray-8 cursor-pointer hover:text-brand-orange'>
                <div>
                    <BsList/>
                </div>
                <p>Problem List</p>
               
                </Link>
                <div className='flex items-center justify-center rounded bg-white hover:text-brand-orange h-8 w-8 cursor-pointer'
                onClick={()=>handleProblemChange(true)}>
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
                            className='absolute right-0 top-10 mt-1 origin-top-right rounded bg-dark-layer-1 p-2 text-brand-orange shadow-lg 
							z-50 scale-0 group-hover:scale-100 transition-all duration-300 ease-in-out'
                        >
                            <p className='max-w-60 text-sm whitespace-nowrap'>{user.email}</p>
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