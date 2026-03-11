"use client"
import React, { useEffect, useState } from 'react';
import LandingNavbar from "@/app/components/LandingNavbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';
import { useRouter } from 'next/navigation';


//Navbar 5 rem so thats why 100vh-5rem
const LandingPage= () => { 
    const [user,loading,error]=useAuthState(auth)
    const [pageloading,setpageloading]=useState(true);

    const router=useRouter()
    useEffect(()=>{
        if (user){
            router.push('/dashboard')
        }
        if (!loading && !user) setpageloading(false);
    },[user,router,loading])
    if (pageloading){
        return null;
    }
    return <div className='bg-linear-to-b from-gray-600 to-black 
    h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <LandingNavbar/>
            <div className='flex items-center justify-center 
            h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <img src="/hero.png" alt='heroimage'/>
            </div>
        </div>
    </div>
}
export default LandingPage;