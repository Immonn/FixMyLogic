"use client";

import { Card } from "@/app/components/CardComponent";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { useRouter } from "next/navigation";

const LandingPage = () => {
    const router = useRouter();

    return (
        <div className="bg-dark-layer-2 min-h-screen relative font-sans text-white overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-orange opacity-10 blur-[100px]" />
            <div className="pointer-events-none absolute top-1/2 right-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500 opacity-10 blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col min-h-screen">
                <DashboardNavbar />
                
                {/* Hero Section */}
                <div className="mt-12 mb-12 sm:mt-16 sm:mb-16 text-center sm:text-left sm:flex sm:items-end sm:justify-between border-b border-dark-divider-border-2/50 pb-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                            Welcome back, <span className="text-brand-orange">Coder</span>
                        </h1>
                        <p className="text-lg text-dark-gray-7 max-w-2xl font-medium">
                            Pick up where you left off or start a new learning path. Consistency is the key to mastery.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-brand-orange rounded-full shadow-[0_0_10px_rgb(255,161,22)]"></span>
                        Recommended Paths
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png" />
                        <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png" />
                        <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png" />
                        <Card onClick={() => router.push("/patternwise")} image="/Patternwise.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;