import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchSolvedProblems = async () => {
            if (!user) return;
            const userRef = doc(firestore, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                setSolvedProblems(userSnap.data().solvedProblems);
            }
        };

        if (user) fetchSolvedProblems();
        else setSolvedProblems([]);
    }, [user]);

    return solvedProblems;
}