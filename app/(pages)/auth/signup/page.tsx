"use client"
import React, { useRef, useState } from 'react';
import Navbar from "@/app/components/SignupNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import {auth} from "@/app/firebase/firebase";
import { firestore } from '@/app/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { setDoc,doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

type SignupPageProps = {

};

const SignupPage: React.FC<SignupPageProps> = () => {
    const usernameref = useRef<HTMLInputElement>(null);
    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const [formError, setFormError] = useState<string>("");
    const router=useRouter()

    //Firebase React hook to log in by email and password
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
    ] = useCreateUserWithEmailAndPassword(auth);

    async function handleregistration(){
        setFormError("");
        const email=emailref.current?.value.trim();
        const password=passwordref.current?.value.trim();
        const username=usernameref.current?.value.trim();

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
            toast.loading("Creating Account...",{position:"top-center",toastId:"loadingToast"})
            const newUser=await createUserWithEmailAndPassword(email,password)
            if (!newUser){
                setFormError("Registration failed. Please try again.");
                return;
            }
            const userData={
                uid:newUser.user.uid,
                email:newUser.user.email,
                createdAt:Date.now(),
                updatedAt:Date.now(),
                likedProblems:[],
                dislikedProblems:[],
                solvedProblems:[],
                starredProblems:[],
                displayName:username
            }
            await setDoc(doc(firestore,"users",newUser.user.uid),userData)
            router.push("/auth/signin")
        }
        catch(error:any){
            toast.error(error.message,{position:"top-center"})
        }finally{
            toast.dismiss("loadingToast")
        }
    }
    return <div className='bg-linear-to-b from-gray-600 to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar />
        </div>
        <div className=' flex justify-center items-center mt-30'>
            <div className="bg-white rounded-lg shadow relative py-10 w-120 bg-linear-to-b from-brand-orange to-slate-900 mx-6 flex flex-col items-center justify-center gap-4">
                <p className='font-medium text-3xl text-gray-300'>Create Account</p>
                <Input ref={emailref} placeholder='Email' />
                <Input ref={usernameref} placeholder='Username' />
                <Input ref={passwordref} placeholder='Password' />
                {formError && <p className="text-red-400 text-sm text-center px-4">{formError}</p>}
                <Button onClick={handleregistration} text={loading ? "Creating..." : "Create Account"} />
            </div>
        </div>
    </div>
}
export default SignupPage;