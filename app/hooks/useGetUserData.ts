import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useGetUserData(problemId:string){
    const [data,setData]=useState({liked:false,disliked:false,starred:false,solved:false})
    const [user]=useAuthState(auth)
    useEffect(()=>{
        const getUserdataonProblem=async ()=>{
            const useRef=doc(firestore,"users",user!.uid); // ! -> It saying trust me typescript  user is not null
            const userSnap=await getDoc(useRef)
            if (userSnap.exists()){
                const data=userSnap.data();
                const {solvedProblems = [],likedProblems = [],dislikedProblems = [],starredProblems = []}=data;
                setData({
                    liked:likedProblems.includes(problemId),
                    disliked:dislikedProblems.includes(problemId),
                    starred:starredProblems.includes(problemId),
                    solved:solvedProblems.includes(problemId)
                })
            }
            
        }
        if (user) getUserdataonProblem();
        return () => setData({liked:false,disliked:false,starred:false,solved:false});
    },[problemId,user])
    return {...data,setData}
}