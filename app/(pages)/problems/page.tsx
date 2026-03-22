import ProblemNavBar from "@/app/components/ProblemNavbar";
import Workflow from "@/app/components/Workflows/Workflow";


export default function Problem(){
    return <div className="h-screen flex flex-col ">
    <div className="shrink-0">
        <ProblemNavBar/>
    </div>
    <div className="flex-1 min-h-0 bg-linear-to-b from-gray-700 to-black">
        <Workflow/>
    </div>
    </div>
}

