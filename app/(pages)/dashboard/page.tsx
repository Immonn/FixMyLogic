"use client";

import { MetricCard } from "@/app/components/MetricCard";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import { useRouter } from "next/navigation";
import { FaCubes, FaGem, FaNetworkWired } from "react-icons/fa";
import { MdOutlineGridOn } from "react-icons/md";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";

const LandingPage = () => {
    const [user, loadingAuth] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (!loadingAuth && !user) {
			router.push("/auth/signin");
		}
	}, [user, loadingAuth, router]);

	if (loadingAuth) {
		return (
			<div className='bg-dark-layer-2 min-h-screen flex items-center justify-center'>
				<div className='text-white text-xl animate-pulse'>Loading...</div>
			</div>
		);
	}

	if (!user) return null;

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
                            Pick up where you left off or start a new learning path.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-brand-orange rounded-full shadow-[0_0_10px_rgb(255,161,22)]"></span>
                        Featured
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
                        <MetricCard 
                            title="DSA Pattern Wise" 
                            icon={<FaCubes />} 
                            color="bg-[#30a283]" 
                            onClick={() => router.push("/patternwise")} 
                        />
                        <MetricCard 
                            title="Low Level Design (LLD) (Coming Soon)" 
                            icon={<MdOutlineGridOn />} 
                            color="bg-[#d4bca4]" 
                            
                        />
                        <MetricCard 
                            title="All Problems (Coming Soon)" 
                            icon={<FaGem />} 
                            color="bg-[#3e4db9]" 
            
                        />
                        <MetricCard 
                            title="OOPS (Coming Soon)" 
                            icon={<FaNetworkWired />} 
                            color="bg-[#a874d4]" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;