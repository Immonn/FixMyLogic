import React from "react";

interface MetricCardProps {
    title: string;
    icon: React.ReactNode;
    color: string;
    onClick?: () => void;
}

export function MetricCard({ title, icon, color, onClick }: MetricCardProps) {
    return (
        <div 
            onClick={onClick}
            className="group cursor-pointer flex flex-col p-3 rounded-[2rem] bg-[#16181d] border border-white/5 hover:bg-[#1f2229] transition-all duration-300 w-full shadow-lg"
        >
            {/* Colored Inner Container */}
            <div 
                className={`flex-1 flex aspect-[4/2.5] items-center justify-center rounded-[1.5rem] mb-3 transition-transform duration-300 group-hover:scale-[0.98] ${color}`}
            >
                <div className="text-white text-5xl opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                    {icon}
                </div>
            </div>
            
            {/* Text Below */}
            <div className="text-center pb-2">
                <span className="text-gray-200 font-semibold text-[1.05rem] tracking-wide">{title}</span>
            </div>
        </div>
    );
}
