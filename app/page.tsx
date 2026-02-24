import React from 'react';
import LandingNavbar from "@/app/components/LandingNavbar"

type LandingPageProps = {
    
};
//Navbar 5 rem so thats why 100vh-5rem
const LandingPage:React.FC<LandingPageProps> = () => {
    
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