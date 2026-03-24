
import LandingNavbar from "@/app/components/LandingNavbar"


//Navbar 5 rem so thats why 100vh-5rem
const LandingPage= () => { 

    return <div className='bg-linear-to-b from-gray-600 to-black 
    min-h-screen relative'>
        <div className="max-w-7xl mx-auto flex flex-col h-screen">
            <LandingNavbar/>
            <div className='flex-1 flex items-center justify-center w-full pointer-events-none select-none px-4 sm:px-8 pb-10'>
                <img src="/hero.png" alt='heroimage' className="w-[90%] sm:w-[85%] max-w-5xl object-contain drop-shadow-2xl scale-110" />
            </div>
        </div>
    </div>
}
export default LandingPage;