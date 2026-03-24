
import LandingNavbar from "@/app/components/LandingNavbar"


//Navbar 5 rem so thats why 100vh-5rem
const LandingPage= () => { 

    return <div className='bg-linear-to-b from-gray-600 to-black 
    min-h-screen relative'>
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
            <LandingNavbar/>
            <div className='flex-1 flex items-center justify-center w-full pointer-events-none select-none px-4 sm:px-8 pb-6'>
                <img src="/hero.png" alt='heroimage' className="w-[80%] sm:w-[70%] max-w-3xl max-h-[70vh] object-contain drop-shadow-2xl" />
            </div>
        </div>
    </div>
}
export default LandingPage;