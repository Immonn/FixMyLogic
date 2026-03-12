
import { Card } from "@/app/components/CardComponent";
import DashboardNavbar from "@/app/components/DashboardNavbar";




const LandingPage= () => { 

    return <div className='bg-linear-to-b from-gray-600 to-black 
    h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <DashboardNavbar/>
        </div>
        <div>
            <Card image="/Patternwise.png"/>
        </div>
    </div>
}
export default LandingPage;