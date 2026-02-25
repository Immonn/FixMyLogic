import React from 'react';
import Navbar from "@/app/components/SigninNavbar"
import { Input } from '@/app/components/Input';
import { Button } from '@/app/components/Button';

type SignInPageProps = {
    
};

const SignInPage:React.FC<SignInPageProps> = () => {
    
    return <div className='bg-linear-to-b from-gray-600 to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar/>
        </div>
        <div className=' flex justify-center items-center mt-30'>
        <div className="bg-white rounded-lg shadow relative py-10 w-120 bg-linear-to-b from-brand-orange to-slate-900 mx-6 flex flex-col items-center justify-center gap-4">
            <p className='font-medium text-3xl text-gray-300'>Welcome Back !</p>
            <Input placeholder='Username'/>
            <Input placeholder='Password'/>
            <Button text="Sign In"/>
        </div>
        </div>
    </div>
}
export default SignInPage;