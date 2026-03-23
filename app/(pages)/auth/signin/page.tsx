"use client";
import React, { useState,useRef } from 'react';
import Navbar from "@/app/components/SigninNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import ResetPassword from '@/app/components/ResetPassword';
import { auth, firestore } from "@/app/firebase/firebase";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from 'react';

const SignInPage = () => {
    const [open, setOpen] = useState(false)

    const router=useRouter()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);
    const [formError, setFormError] = useState<string>("");

    useEffect(() => {
        const checkRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    const userRef = doc(firestore, "users", result.user.uid);
                    const userSnap = await getDoc(userRef);

                    if (!userSnap.exists()) {
                        const userData = {
                            uid: result.user.uid,
                            email: result.user.email,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            likedProblems: [],
                            dislikedProblems: [],
                            solvedProblems: [],
                            starredProblems: [],
                            displayName: result.user.displayName || "User"
                        };
                        await setDoc(userRef, userData);
                    }
                    router.push("/dashboard");
                }
            } catch (err: any) {
                toast.error(err.message, {position: "top-center"});
            } finally {
                setIsGoogleLoading(false);
            }
        };
        checkRedirect();
    }, [router]);

    async function handleGoogleAuth() {
        try {
            setIsGoogleLoading(true);
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error: any) {
            setIsGoogleLoading(false);
            toast.error(error.message, {position: "top-center"});
        }
    }

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
                
                <div className="flex items-center w-full gap-2 my-2 mt-4">
                    <div className="h-px bg-white/20 flex-1"></div>
                    <span className="text-white/60 text-sm font-medium">OR</span>
                    <div className="h-px bg-white/20 flex-1"></div>
                </div>

                <div 
                    onClick={handleGoogleAuth}
                    className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 border border-white/20 rounded-xl shadow-sm cursor-pointer transition-all duration-300 pointer-events-auto backdrop-blur-sm"
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 pointer-events-none drop-shadow-md" alt="Google" />
                    {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
                </div>

                <div onClick={() => setOpen(true)} className='text-white/80 mt-3 hover:text-white transition duration-150 cursor-pointer text-sm font-medium tracking-wide'>Forgot Password?</div>
            </div>
        </div>
    </div>
}
export default SignInPage;