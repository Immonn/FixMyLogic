import { problems } from "@/app/utils/problems";
import { notFound } from "next/navigation";
import ProblemContent from "@/app/components/ProblemContent";
import React from "react";

export default async function Problem({ params }: { params: Promise<{ pid: string }> }) {
	const { pid } = await params;
	const problem = (problems as any)[pid];

	if (!problem) return notFound();

	return <ProblemContent problem={problem} pid={pid} />;
}

export async function generateStaticParams() {
	return Object.keys(problems).map((key) => ({
		pid: key,
	}));
}