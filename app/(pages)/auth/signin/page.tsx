"use client";
import React, { useState } from 'react';
import Navbar from "@/app/components/SigninNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { ResetPassword } from '@/app/components/ResetPassword';


const SignInPage = () => {
    const [open,setOpen]=useState(false)

    
    return <div className='bg-linear-to-b from-gray-600 to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar/>
        </div>
        <ResetPassword open={open} onclose={()=>setOpen(false)}/>
        <div className=' flex justify-center items-center mt-30'>
        <div className="bg-white rounded-lg shadow relative py-10 w-120 bg-linear-to-b from-brand-orange to-slate-900 mx-6 flex flex-col items-center justify-center gap-4">
            <p className='font-medium text-3xl text-gray-300'>Welcome Back !</p>
            <Input placeholder='Username' className='w-100'/>
            <Input placeholder='Password' className='w-100'/>
            <Button text="Sign In"/>
            <div onClick={() => setOpen(true)} className='text-white mr-70 hover:text-brand-orange transition duration-150 cursor-pointer text-sm'>Forgot Password ?</div>
        </div>
        </div>
    </div>
}
export default SignInPage;