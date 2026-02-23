import React from 'react';
import Navbar from "@/app/components/Navbar"

type LandingPageProps = {
    
};

const LandingPage:React.FC<LandingPageProps> = () => {
    
    return <div className='bg-linear-to-b from-gray-600 to-black h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <Navbar/>
        </div>
    </div>
}
export default LandingPage;