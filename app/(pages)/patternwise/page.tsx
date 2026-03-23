'use client'
import { useState } from "react";
import DashboardNavbar from "@/app/components/DashboardNavbar";
import ProblemTable from "@/app/components/ProblemTable";


export default function Patternwise() {
    const [loadingProblems,setLoadingProblems]=useState(true);

    return (
        <div className="bg-linear-to-b from-gray-600 to-black min-h-screen relative">
            <div className="max-w-7xl mx-auto">
                <DashboardNavbar />
            </div>

            <main className="max-w-5xl mt-2 mx-auto px-6 py-8">
                <div className="overflow-x-auto rounded-lg border border-gray-700">
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
                        <ProblemTable setLoadingProblems={setLoadingProblems} loadingProblems={loadingProblems} />
                    </table>
                </div>

            </main>
        </div>
    );
}