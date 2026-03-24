'use client'
import DashboardNavbar from "@/app/components/DashboardNavbar";
import ProblemTable from "@/app/components/ProblemTable";
import { useState } from "react";

export default function Patternwise() {
    const [loadingProblem,setLoadingProblem]=useState<boolean>(false);
    
    return (
        <div className="bg-linear-to-b from-gray-600 to-black min-h-screen relative">
            <div className="max-w-6xl mx-auto">
                <DashboardNavbar />
            </div>

            <main className="w-full max-w-6xl mt-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
                <div className="overflow-x-auto w-full rounded-lg border border-gray-700">
                    <table className="w-full text-left text-white">
                        <thead className="bg-gray-800/70">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-0 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 w-0 font-medium">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 w-0 font-medium">
                                    Difficulty
                                </th>
                                <th scope="col" className="px-6 py-3 w-0 font-medium">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 w-0 font-medium">
                                    Solution
                                </th>
                            </tr>
                        </thead>
                        {loadingProblem && (
                            <tbody className="animate-pulse">
                                {[...Array(5)].map((_, idx) => (
                                    <LoadingSkeleton key={idx} />
                                ))}
                            </tbody>
                        )}
                        <ProblemTable setLoadingProblems={setLoadingProblem}/>
                    </table>
                </div>
            </main>
        </div>
    );
}

const LoadingSkeleton = () => {
    return (
        <tr>
            <td className="px-6 py-4">
                <div className="w-6 h-6 rounded-full bg-dark-layer-1"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-24 rounded-full bg-dark-layer-1"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-24 rounded-full bg-dark-layer-1"></div>
            </td>
            <td className="px-6 py-4">
                <div className="w-8 h-8 rounded-full bg-dark-layer-1"></div>
            </td>
        </tr>
    );
};