"use client";
import React, { useState,useRef } from 'react';
import Navbar from "@/app/components/SigninNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import ResetPassword from '@/app/components/ResetPassword';
import {auth} from "@/app/firebase/firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const [open, setOpen] = useState(false)

    const router=useRouter()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const [formError, setFormError] = useState<string>("");

    async function handlelogin(){
        setFormError("");
        const email=emailref.current?.value.trim();
        const password=passwordref.current?.value.trim();

        if (!email || !password) {
            setFormError("Email and password are required.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormError("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setFormError("Password must be at least 6 characters.");
            return;
        }
        try{
            const newUser=await signInWithEmailAndPassword(email,password)
            if (!newUser){
                setFormError("Registration failed. Please try again.");
                return;
            }
            router.push("/dashboard")
            
        }
        catch(error:any){
            setFormError(error.message);
        }

    }
    return <div className='bg-linear-to-b from-gray-600 to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar />
        </div>
        <ResetPassword open={open} onclose={() => setOpen(false)} />
        <div className=' flex justify-center items-center mt-20 sm:mt-32'>
            <div className="bg-white rounded-2xl shadow-2xl relative py-16 px-8 sm:px-12 w-full max-w-[500px] bg-linear-to-b from-brand-orange to-slate-900 mx-6 flex flex-col items-center justify-center gap-6">
                <p className='font-semibold text-4xl text-gray-200 mb-2'>Welcome Back!</p>
                <Input ref={emailref} placeholder='Username' className='w-100' />
                <Input ref={passwordref} placeholder='Password' className='w-100' />
                {formError && <p className="text-red-400 text-sm text-center px-4">{formError}</p>}
                <Button onClick={handlelogin} text={loading ? "Loading..":"Sign In"} />
                <div onClick={() => setOpen(true)} className='text-white mr-70 hover:text-brand-orange transition duration-150 cursor-pointer text-sm'>Forgot Password ?</div>
            </div>
        </div>
    </div>
}
export default SignInPage;