"use client"
import React, { useRef, useState } from 'react';
import Navbar from "@/app/components/SignupNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { auth, firestore } from "@/app/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    async function handleGoogleAuth() {
        try {
            setIsGoogleLoading(true);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            
            const result = await signInWithPopup(auth, provider);
            
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
        } catch (error: any) {
            console.error("Google Auth Error:", error);
            if (error.code === 'auth/popup-blocked') {
                toast.error("Popup blocked by browser! Please allow popups.", {position: "top-center"});
            } else if (error.code === 'auth/popup-closed-by-user') {
                toast.info("Authentication cancelled.", {position: "top-center"});
            } else {
                toast.error(error.message, {position: "top-center"});
            }
        } finally {
            setIsGoogleLoading(false);
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
    return <div className='bg-linear-to-b from-gray-600 to-black min-h-screen relative pb-10'>
        <div className="max-w-7xl mx-auto">
            <Navbar />
        </div>
        <div className='flex justify-center items-center mt-6 sm:mt-10'>
            <div className="rounded-2xl shadow-2xl relative py-8 px-8 sm:px-12 w-full max-w-[440px] bg-linear-to-b from-brand-orange to-slate-900 mx-6 flex flex-col items-center justify-center gap-4">
                <p className='font-semibold text-3xl text-gray-200 mb-1'>Create Account</p>
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
                    {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
                </div>
            </div>
        </div>
    </div>
}
export default SignupPage;