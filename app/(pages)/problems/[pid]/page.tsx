import ProblemNavBar from "@/app/components/ProblemNavbar";
import Workflow from "@/app/components/Workflows/Workflow";
import { problems } from "@/app/utils/problems";
import { notFound } from "next/navigation";

export default async function Problem({ params }: { params: Promise<{ pid: string }> }) {
  const { pid } = await params;
  const problem = problems[pid];

  if (!problem) return notFound();

  const serializableProblem = {
    ...problem,
    handlerFunction:
      typeof problem.handlerFunction === "function"
        ? problem.handlerFunction.toString()
        : problem.handlerFunction,
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="shrink-0">
        <ProblemNavBar />
      </div>
      <div className="flex-1 min-h-0 bg-linear-to-b from-gray-700 to-black">
        <Workflow key={pid} problem={serializableProblem} />
      </div>
    </div>
  );
}



export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    pid: key,
  }));
}