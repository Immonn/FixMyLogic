'use client'
import React, { useEffect, useState } from 'react';
import PrefenceNav from './preferenceNav';
import dynamic from 'next/dynamic';
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import EditorFooter from './Editorfooter';
import { Problem } from '@/app/utils/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/app/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '@/app/utils/problems';
import { useParams } from 'next/navigation';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { runOnPiston, PistonResult } from '@/app/utils/pistonRunner';
import { PistonLanguage } from '@/app/utils/types';

const Split = dynamic(() => import('react-split'), { ssr: false });

type PlaygroundProps = {
    problem: Problem
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    setSolved: React.Dispatch<React.SetStateAction<boolean>>
    success: boolean
};

export interface ISetting{
    fontSize:string,
    setSettingModalOpen:boolean,
    dropdownIsOpen:boolean,
    selectedLanguage:string
}

type LangKey = 'JavaScript' | 'Python' | 'C++' | 'Java';

/** Returns the starter code for a given language */
function getStarterCode(problem: Problem, lang: LangKey): string {
    switch (lang) {
        case 'Python': return problem.starterCodePython ?? '# Write your code here';
        case 'C++':    return problem.starterCodeCpp    ?? '// Write your code here';
        case 'Java':   return problem.starterCodeJava   ?? '// Write your code here';
        default:       return problem.starterCode;
    }
}

/** localStorage key per problem + language */
function lsKey(pid: string | string[], lang: string) {
    return `code-${pid}-${lang}`;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved, success }) => {

    const [settings, setSettings] = useState<ISetting>({
        fontSize: "16px",
        setSettingModalOpen: false,
        dropdownIsOpen: false,
        selectedLanguage: "JavaScript"
    });
    const [activeTestCaseId, setActiveCaseId] = useState<number>(0);
    const [failed, setFailed] = useState<boolean>(false);
    const [actualOutputs, setActualOutputs] = useState<string[]>([]);
    const [caseResults, setCaseResults] = useState<boolean[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);

    const params = useParams();
    const pid = params.pid as string;
    const lang = settings.selectedLanguage as LangKey;

    const [userCode, setUserCode] = useState<string>(getStarterCode(problem, lang));

    // Load saved/starter code when language or problem changes
    useEffect(() => {
        const saved = localStorage.getItem(lsKey(pid, lang));
        if (saved) {
            setUserCode(JSON.parse(saved));
        } else if (user || lang !== 'JavaScript') {
            setUserCode(getStarterCode(problem, lang));
        } else {
            setUserCode(problem.starterCode);
        }
        // Reset test state on language change
        setActualOutputs([]);
        setCaseResults([]);
        setSuccess(false);
        setFailed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid, lang, user]);

    const handleSubmission = async () => {
        if (!user) {
            toast.error("Please login to submit your code", { position: "top-center", autoClose: 3000, theme: "dark" });
            return;
        }

        setSuccess(false);
        setFailed(false);
        setActualOutputs([]);
        setCaseResults([]);

        // ── JavaScript path (unchanged local execution) ──────────────────────
        if (lang === 'JavaScript') {
            try {
                let code = userCode.slice(userCode.indexOf(problem.starterFunctionName));
                const cb = new Function(`return ${code}`)();
                const handler = problems[pid].handlerFunction;

                if (typeof handler === 'function') {
                    const outputs: string[] = [];
                    const results: boolean[] = [];

                    for (const ex of problem.examples) {
                        if (!ex.inputArgs) { outputs.push('N/A'); results.push(false); continue; }
                        try {
                            const res = cb(...ex.inputArgs);
                            const actual = JSON.stringify(res);
                            outputs.push(actual);
                            try {
                                results.push(JSON.stringify(JSON.parse(ex.outputText)) === actual);
                            } catch {
                                results.push(String(res) === ex.outputText);
                            }
                        } catch {
                            outputs.push('Error');
                            results.push(false);
                        }
                    }

                    setActualOutputs(outputs);
                    setCaseResults(results);

                    const allPassed = handler(cb);
                    if (allPassed) {
                        toast.success("Congrats! All Testcases Passed", { position: "top-center", autoClose: 3000, theme: "dark" });
                        setSuccess(true);
                        const userRef = doc(firestore, "users", user.uid);
                        await updateDoc(userRef, { solvedProblems: arrayUnion(pid) });
                        setSolved(true);
                    }
                }
            } catch (error: any) {
                console.log(error);
                setFailed(true);
                if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal")) {
                    toast.error("Oops! One or more Testcases Failed", { position: "top-center", autoClose: 3000, theme: "dark" });
                } else {
                    toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
                }
            }
            return;
        }

        // ── Piston path (Python, C++, Java) ───────────────────────────────────
        const langKey = lang === 'Python' ? 'python' : lang === 'C++' ? 'cpp' : 'java';
        const boilerplate = problem.pistonTestCases?.[langKey as PistonLanguage];

        if (!boilerplate) {
            toast.error(`${lang} is not supported for this problem yet.`, { position: "top-center", autoClose: 3000, theme: "dark" });
            return;
        }

        const fullCode = boilerplate.replace('{{USER_CODE}}', userCode);
        const expectedOutputs = problem.examples.map(ex => ex.outputText);

        setIsLoading(true);
        try {
            const result: PistonResult = await runOnPiston(langKey as PistonLanguage, fullCode, expectedOutputs);

            if (result.error && result.outputs.every(o => o === 'Error')) {
                toast.error(`Runtime Error: ${result.error}`, { position: "top-center", autoClose: 4000, theme: "dark" });
                setFailed(true);
                setActualOutputs(result.outputs);
                setCaseResults(result.results);
                return;
            }

            setActualOutputs(result.outputs);
            setCaseResults(result.results);

            const allPassed = result.results.every(Boolean);
            if (allPassed) {
                toast.success("Congrats! All Testcases Passed", { position: "top-center", autoClose: 3000, theme: "dark" });
                setSuccess(true);
                const userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, { solvedProblems: arrayUnion(pid) });
                setSolved(true);
            } else {
                toast.error("Oops! One or more Testcases Failed", { position: "top-center", autoClose: 3000, theme: "dark" });
                setFailed(true);
            }
        } catch (e: any) {
            toast.error(e.message || "Something went wrong", { position: "top-center", autoClose: 3000, theme: "dark" });
            setFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    const onchange = (value: string) => {
        setUserCode(value);
        localStorage.setItem(lsKey(pid, lang), JSON.stringify(value));
    };

    /** Pick CodeMirror language extension based on selected language */
    const langExtension = () => {
        switch (lang) {
            case 'Python': return python();
            case 'C++':    return cpp();
            case 'Java':   return java();
            default:       return javascript();
        }
    };

    return (
        <div className='flex h-full min-h-0 flex-col overflow-hidden bg-dark-layer-1 text-dark-gray-8'>
            <PrefenceNav settings={settings} setSettings={setSettings}/>
            <Split className="min-h-0 flex-1" direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className="min-h-0 w-full overflow-hidden relative">
                    <CodeMirror
                        value={userCode}
                        theme={vscodeDark}
                        onChange={onchange}
                        extensions={[langExtension()]}
                        height='100%'
                        style={{ fontSize: settings.fontSize, height: '100%' }}
                    />
                    {/* Loading overlay when calling Piston */}
                    {isLoading && (
                        <div className='absolute inset-0 bg-dark-layer-1 bg-opacity-80 flex flex-col items-center justify-center z-10'>
                            <div className='w-10 h-10 border-4 border-dark-fill-3 border-t-green-500 rounded-full animate-spin mb-3'></div>
                            <p className='text-sm text-dark-gray-6'>Running on Piston...</p>
                        </div>
                    )}
                </div>
                <div className='min-h-0 w-full overflow-auto px-5 pb-4'>
                    {/* TestCases Heading */}
                    <div className='flex h-10 items-center space-x-6'>
                        <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                            <div className={`text-sm font-medium leading-5 transition-colors duration-300 ${success ? 'text-green-500' : failed ? 'text-red-500' : 'text-white'}`}>Testcases</div>
                            <hr className={`absolute bottom-0 h-0.5 w-full rounded-full border-none transition-colors duration-300 ${success ? 'bg-green-500' : failed ? 'bg-red-500' : 'bg-white'}`} />
                        </div>
                    </div>
                    <div className="flex">
                        {problem.examples.map((example, index) => (
                            <div className="mr-2 items-start mt-2" key={example.id}
                                onClick={() => setActiveCaseId(index)}>
                                <div className="flex flex-wrap items-center gap-y-4">
                                    <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                                hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                ${
                                    caseResults.length > 0
                                        ? caseResults[index] ? 'text-green-500' : 'text-red-500'
                                        : activeTestCaseId === index ? 'text-white' : 'text-gray-500'
                                }`}>
                                        Case {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="font-semibold my-4 min-w-0">
                        <p className='text-sm font-medium mt-4 text-white'>Input : </p>
                        <div className='w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 border-tarnsparent text-white mt-2 whitespace-pre-wrap wrap-break-word leading-6'>
                            {problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-white'>Output : </p>
                        <div className='w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 border-tarnsparent text-white mt-2 whitespace-pre-wrap wrap-break-word leading-6'>
                            {problem.examples[activeTestCaseId].outputText}
                        </div>
                        {actualOutputs.length > 0 && (
                            <>
                                <p className='text-sm font-medium mt-4 text-white'>Your Output : </p>
                                <div className={`w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 mt-2 whitespace-pre-wrap wrap-break-word leading-6 transition-colors duration-300
                                    ${
                                        caseResults.length > 0
                                            ? caseResults[activeTestCaseId] ? 'text-green-400 border-green-700' : 'text-red-400 border-red-700'
                                            : 'text-white border-transparent'
                                    }`}>
                                    {actualOutputs[activeTestCaseId] ?? 'N/A'}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Split>
            <EditorFooter handleSubmission={handleSubmission} isLoading={isLoading} />
        </div>
    );
}
export default Playground;