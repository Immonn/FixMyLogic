"use client"
import React, { useRef, useState } from 'react';
import Navbar from "@/app/components/SignupNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import {auth} from "@/app/firebase/firebase";
import { firestore } from '@/app/firebase/firebase';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { setDoc, doc, getDoc } from 'firebase/firestore';
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

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    async function handleGoogleAuth() {
        try {
            toast.loading("Authenticating...", {position:"top-center",toastId:"googleAuthToast"});
            const newUser = await signInWithGoogle();
            if (!newUser) return;

            const userRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                const userData = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    likedProblems: [],
                    dislikedProblems: [],
                    solvedProblems: [],
                    starredProblems: [],
                    displayName: newUser.user.displayName || "User"
                };
                await setDoc(userRef, userData);
            }
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message, {position: "top-center"});
        } finally {
            toast.dismiss("googleAuthToast");
        }
    }

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
        <div className=' flex justify-center items-center mt-20 sm:mt-32'>
            <div className="bg-white rounded-2xl shadow-2xl relative py-16 px-8 sm:px-12 w-full max-w-[500px] bg-linear-to-b from-brand-orange to-slate-900 mx-6 flex flex-col items-center justify-center gap-6">
                <p className='font-semibold text-3xl sm:text-4xl text-gray-200 mb-2'>Create Account</p>
                <Input ref={emailref} placeholder='Email' />
                <Input ref={usernameref} placeholder='Username' />
                <Input ref={passwordref} placeholder='Password' />
                {formError && <p className="text-red-400 text-sm text-center px-4">{formError}</p>}
                <Button onClick={handleregistration} text={loading ? "Creating..." : "Create Account"} />
                
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
                    {gLoading ? "Redirecting..." : "Continue with Google"}
                </div>
            </div>
        </div>
    </div>
}
export default SignupPage;