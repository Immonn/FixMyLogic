"use client";

import { Card } from "@/app/components/CardComponent";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { useRouter } from "next/navigation";




const LandingPage= () => { 
    const router=useRouter();

    return <div className='bg-linear-to-b from-gray-600 to-black 
    min-h-screen relative'>
        <div className="max-w-7xl mx-auto">
            <DashboardNavbar/>
        </div>
        <div className="grid grid-cols-3  ml-30 mr-40">
            <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png"/>
            <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png"/>
            <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png"/>
            <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png"/>
        </div>
    </div>
}
export default LandingPage;