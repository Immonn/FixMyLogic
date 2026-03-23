import { Problem } from "@/app/utils/types";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { useGetCurrentProblem } from "@/app/hooks/useGetCurrentProblem";
import RectangleSkeleton from "../Skeletons/RectangleSkeleton";
import CircleSkeleton from "../Skeletons/CircleSkeleton";
import {useGetUserData} from "@/app/hooks/useGetUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/app/firebase/firebase";
import {toast} from "react-toastify"
import { doc, runTransaction } from "firebase/firestore";

type ProblemDescriptionProps = {
	problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
	const {liked,disliked,solved,setData,starred}=useGetUserData(problem.id);
	const [user]=useAuthState(auth)
	const { currentProblem, loading, problemDifficulty,setCurrentProblem } = useGetCurrentProblem(problem.id);
	
	
	const returnUserDataAndProblemData=async (transaction:any) =>{
		const problemRef=doc(firestore,"problems",problem.id);
		const userRef=doc(firestore,"users",user!.uid);
		const problemSnap=await transaction.get(problemRef);
		const userSnap=await transaction.get(userRef);
		return {problemSnap,userSnap,userRef,problemRef}
	}

	async function handleLike(){
		if (!user){
			toast.error("You must be logged In to like this problem",{position:"top-center",theme:"dark"});
			return 
		}
		//Three cases Already Liked , Already Disliked , neither
		//We'll use firebase transaction because onLike we have to update both user and problem db
		await runTransaction(firestore,async(transaction)=>{
			const {problemSnap,userSnap,userRef,problemRef}=await returnUserDataAndProblemData(transaction);
			if (problemSnap.exists() && userSnap.exists()) {
				if (liked){
					//remove problem id from likedProblems on user Document, decrement like count on problem document
					transaction.update(userRef,{likedProblems:userSnap.data().likedProblems.filter((id:string)=>id!==problem.id)})
					transaction.update(problemRef,{likes:problemSnap.data().likes-1})
					setCurrentProblem((prev)=> prev ? ({...prev,likes:prev.likes-1}) : null)
					setData(prev => ({...prev,liked:false}))
				} else if (disliked){
					transaction.update(userRef,{likedProblems:[...userSnap.data().likedProblems,problem.id],
						dislikedProblems:userSnap.data().dislikedProblems.filter((id:string)=>id!==problem.id)
					})
					transaction.update(problemRef,{likes:problemSnap.data().likes+1,
						dislikes:problemSnap.data().dislikes-1
					})
					setCurrentProblem((prev)=> prev ? ({...prev,likes:prev.likes+1,dislikes:prev.dislikes-1}) : null)
					setData(prev => ({...prev,liked:true,disliked:false}))
				} else {
					transaction.update(userRef,{likedProblems:[...userSnap.data().likedProblems,problem.id]})
					transaction.update(problemRef,{likes:problemSnap.data().likes+1})
					setCurrentProblem((prev)=> prev ? ({...prev,likes:prev.likes+1}) : null)
					setData(prev => ({...prev,liked:true}))
				}
			}
		})
	}

	async function handleDisliked(){
		if (!user){
			toast.error("You must be logged In to like this problem",{position:"top-center",theme:"dark"});
			return 
		}
		await runTransaction(firestore,async(transaction)=>{
			const {userRef,problemRef,userSnap,problemSnap}=await returnUserDataAndProblemData(transaction);
			if (problemSnap.exists() && userSnap.exists()) {
				//Alredy Disliked , Already Liked , Neither
				if (disliked){
					transaction.update(userRef,{dislikedProblems:userSnap.data().dislikedProblems.filter((id:string)=>id!==problem.id)})
					transaction.update(problemRef,{dislikes:problemSnap.data().dislikes-1})
					setCurrentProblem((prev)=> prev ? ({...prev,dislikes:prev.dislikes-1}) : null)
					setData(prev => ({...prev,disliked:false}))
				} else if (liked){
					transaction.update(userRef,{dislikedProblems:[...userSnap.data().dislikedProblems,problem.id],
						likedProblems:userSnap.data().likedProblems.filter((id:string)=>id!==problem.id)
					})
					transaction.update(problemRef,{dislikes:problemSnap.data().dislikes+1,
						likes:problemSnap.data().likes-1
					})
					setCurrentProblem((prev)=> prev ? ({...prev,dislikes:prev.dislikes+1,likes:prev.likes-1}) : null)
					setData(prev => ({...prev,disliked:true,liked:false}))
				} else {
					transaction.update(userRef,{dislikedProblems:[...userSnap.data().dislikedProblems,problem.id]})
					transaction.update(problemRef,{dislikes:problemSnap.data().dislikes+1})
					setCurrentProblem((prev)=> prev ? ({...prev,dislikes:prev.dislikes+1}) : null)
					setData(prev => ({...prev,disliked:true}))
				}
			}

		})

	}

	return (
		<div className='bg-dark-layer-1 h-full min-w-0 border-r border-dark-divider-border-2 text-dark-gray-8'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden border-b border-dark-divider-border-2'>
				<div className='bg-dark-layer-1 rounded-t-[5px] px-5 py-2.5 text-xs cursor-pointer border border-dark-divider-border-2 border-b-0'>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100%-44px)] min-w-0 overflow-y-auto overflow-x-hidden'>
				<div className='px-5 pb-6 pr-6 w-full min-w-0'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{problem?.title}</div>
						</div>
						{!loading && currentProblem && (
							<div className='flex items-center mt-3'>

								<div
									className={`${problemDifficulty} inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{currentProblem.difficulty}
								</div>
								<div className='rounded p-0.75 ml-4 text-lg transition-colors duration-200 text-dark-green-s'>
									<BsCheck2Circle />
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-0.75  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
								onClick={handleLike}>
									{liked && <AiFillLike style={{ color: "var(--color-dark-blue-s)" }} />}
									{!liked && <AiFillLike />}
									<span className='text-xs'>{currentProblem.likes}</span>
								</div>
								<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-0.75  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
								onClick={handleDisliked}>
									{disliked && <AiFillDislike style={{ color: "var(--color-dark-blue-s)" }} />}
									{!disliked && <AiFillDislike />}
									<span className='text-xs'>{currentProblem.dislikes}</span>
								</div>
								<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-0.75  ml-4 text-xl transition-colors duration-200 text-dark-gray-6 '>
									<TiStarOutline />
								</div>
							</div>
						)}
						{loading && (
							<div className="mt-3 flex space-x-2">
								<RectangleSkeleton/>
								<CircleSkeleton/>
								<RectangleSkeleton/>
								<RectangleSkeleton/>
								<CircleSkeleton/>
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm wrap-break-word'>
							<div
								dangerouslySetInnerHTML={{
									__html: problem.problemStatement,
								}}
							/>
						</div>


						<div className='mt-6 space-y-5 min-w-0 '>
							{problem.examples.map((example, index) => (
								<div key={example.id}>
									<p className='font-medium text-white mt-2'>Example {index + 1}: </p>
									{example.img && <img src={example.img} alt={`example-${index + 1}`} className='mt-2 rounded-md border max-w-full h-auto' />}
									<div className='example-card min-w-0 overflow-x-hidden mt-2'>
										<div className='space-y-1 whitespace-pre-wrap wrap-break-word' style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
											<p className='flex flex-wrap items-baseline'><strong className='text-white'>Input:</strong><span className='ml-2'>{example.inputText}</span></p>
											<p className='flex flex-wrap items-baseline'><strong>Output:</strong><span className='ml-2'>{example.outputText}</span></p>
											{example.explanation && (
												<p className='flex flex-wrap items-baseline'><strong>Explanation:</strong><span className='ml-2'>{example.explanation}</span></p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-5'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc wrap-break-word' dangerouslySetInnerHTML={{ __html: problem.constraints }} />
						</div>
						<div className='h-10' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;