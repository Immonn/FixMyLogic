'use client'
import React, { useEffect, useState } from 'react';
import PrefenceNav from './preferenceNav';
import dynamic from 'next/dynamic';
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './Editorfooter';
import { Problem } from '@/app/utils/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '@/app/utils/problems';
import { useParams, useRouter } from 'next/navigation';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

const Split = dynamic(() => import('react-split'), { ssr: false });

type PlaygroundProps = {
    problem: Problem
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    setSolved: React.Dispatch<React.SetStateAction<boolean>>
};

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
    const [activeTestCaseId, setActiveCaseId] = useState<number>(0);
    const [user] = useAuthState(auth);

    const [userCode, setUserCode] = useState<string>(problem.starterCode)
    const params = useParams();

    useEffect(() => {
        if (user) {
            const code = localStorage.getItem(`code-${params.pid}`)
            setUserCode(code ? JSON.parse(code) : problem.starterCode)
        } else {
            setUserCode(problem.starterCode)
        }
    }, [params.pid,problem.starterCode,user])

    const handleSubmission = async () => {
        if (!user) {
            toast.error("Please login to submit your code", { position: "top-center", autoClose: 3000, theme: "dark" })
            return;
        }
        try {
            const cb = new Function(`return ${userCode}`)(); //It convert String to function
            const handler = problems[params.pid as string].handlerFunction;
            if (typeof handler === 'function') {
                const success = handler(cb);
                if (success) {
                    toast.success("Congrats! All Testcases Passed", { position: "top-center", autoClose: 3000, theme: "dark" })
                    setSuccess(true);
                }
                setTimeout(() => {
                    setSuccess(false)
                }, 4000)
                const userRef = doc(firestore, "users", user.uid)
                await updateDoc(userRef, {
                    solvedProblems: arrayUnion(params.pid)
                })

                setSolved(true);
            }
        } catch (error: any) {
            console.log(error)
            if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal")) {
                toast.error("Oops! One or more Testcases Failed", { position: "top-center", autoClose: 3000, theme: "dark" })
            }
            else {
                toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" })
            }
        }

    }
    const onchange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(`code-${params.pid}`, JSON.stringify(value))
    }
    return <div className='flex h-full min-h-0 flex-col overflow-hidden bg-dark-layer-1 text-dark-gray-8'>
        <PrefenceNav />
        <Split className="min-h-0 flex-1" direction='vertical' sizes={[60, 40]} minSize={60}>
            <div className="min-h-0 w-full overflow-hidden">
                <CodeMirror
                    value={userCode}
                    theme={vscodeDark}
                    onChange={onchange}
                    extensions={[javascript()]}
                    height='100%'
                    style={{ fontSize: 16, height: '100%' }}
                />
            </div>
            <div className='min-h-0 w-full overflow-auto px-5 pb-4'>
                {/* TestCases Heading */}
                <div className='flex h-10 items-center space-x-6'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
                    </div>
                </div>
                <div className="flex">
                    {problem.examples.map((example, index) => (
                        <div className="mr-2 items-start mt-2" key={example.id}
                            onClick={() => setActiveCaseId(index)}>
                            <div className="flex flex-wrap items-center gap-y-4">
                                <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                            hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                            ${activeTestCaseId === index ? "text-white" : "text-gray-500"} `}>
                                    Case {index + 1}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="font-semibold my-4 min-w-0">
                    <p className='text-sm font-medium mt-4  text-white'>Input : </p>
                    <div className='w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 border-tarnsparent text-white mt-2 whitespace-pre-wrap wrap-break-word leading-6'>
                        {problem.examples[activeTestCaseId].inputText}
                    </div>
                    <p className='text-sm font-medium mt-4  text-white'>Output : </p>
                    <div className='w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 border-tarnsparent text-white mt-2 whitespace-pre-wrap wrap-break-word leading-6'>
                        {problem.examples[activeTestCaseId].outputText}
                    </div>
                </div>
            </div>
        </Split>
        <EditorFooter handleSubmission={handleSubmission} />
    </div>
}
export default Playground;