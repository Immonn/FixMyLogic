import { useEffect, useState } from "react";
import { DBProblem } from "../utils/types";
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useGetCurrentProblem(id:string){
    const [currentProblem,setCurrentProblem]=useState<DBProblem | null>(null);
    const [loading,setLoading]=useState(true);
    const [problemDifficulty,setProblemDifficulty]=useState<string>("");
    useEffect(()=>{
        //Get Problem from db 
        const getCurrentProblem=async()=>{
            setLoading(true);
            const docRef=doc(firestore,"problems",id);
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                const problem=docSnap.data();
                setCurrentProblem(problem as DBProblem);
                setProblemDifficulty(problem.difficulty=== "Easy" ? "text-dark-green-s" : problem.difficulty=== "Medium" ? "text-yellow-500" : "text-red-500");
            }
            setLoading(false);   
        }
        getCurrentProblem();
    },[id])
    return {currentProblem,loading,problemDifficulty}
}