import { collection, orderBy, query , getDocs} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { useEffect , useState} from "react";
import { DBProblem } from "../utils/types";

export function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const getProblems = async () => {
			const startTime = Date.now();
			setLoadingProblems(true);
			try {
				const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
				const querySnapshot = await getDocs(q);
				const tmp: DBProblem[] = [];
				querySnapshot.forEach((doc) => {
					tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
				});
				setProblems(tmp);
			} catch (error) {
				console.error("Failed to fetch problems:", error);
			} finally {
				const elapsed = Date.now() - startTime;
				const minSkeletonTime = 900;
				if (elapsed < minSkeletonTime) {
					await new Promise((resolve) => setTimeout(resolve, minSkeletonTime - elapsed));
				}
				setLoadingProblems(false);
			}
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}