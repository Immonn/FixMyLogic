"use client";

import ProblemNavBar from "@/app/components/ProblemNavbar";
import Workflow from "@/app/components/Workflows/Workflow";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase";
import { Problem } from "@/app/utils/types";

type ProblemContentProps = {
    problem: Problem;
    pid: string;
};

export default function ProblemContent({ problem, pid }: ProblemContentProps) {
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

	if (!problem) return notFound();

	return (
		<div className='h-screen flex flex-col'>
			<div className='shrink-0'>
				<ProblemNavBar />
			</div>
			<div className='flex-1 min-h-0 bg-linear-to-b from-gray-700 to-black'>
				<Workflow key={pid} problem={problem} />
			</div>
		</div>
	);
}
