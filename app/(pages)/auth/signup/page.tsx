import React from 'react';
import Navbar from "@/app/components/SignupNavbar"

type SignupPageProps = {
    
};

const SignupPage:React.FC<SignupPageProps> = () => {
    
    return <div className='bg-linear-to-b from-gray-600 to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar/>
        </div>
    </div>
}
export default SignupPage;