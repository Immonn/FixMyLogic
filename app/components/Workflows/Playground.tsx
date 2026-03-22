'use client'
import React, { useEffect, useRef, useState } from 'react';
import PrefenceNav from './preferenceNav';
import dynamic from 'next/dynamic';
import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './Editorfooter';

const Split = dynamic(() => import('react-split'), { ssr: false });

type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    const boilerplate=`function twoSum(nums,target){
    //Write your code here
};`;
    return <div className='flex h-full min-h-0 flex-col overflow-hidden bg-dark-layer-1 text-dark-gray-8'>
        <PrefenceNav/>
        <Split className="min-h-0 flex-1" direction='vertical' sizes={[50,50]} minSize={50}>
            <div className="min-h-0 w-full overflow-hidden">
                <CodeMirror
                value={boilerplate}
                theme={vscodeDark}
                extensions={[javascript()]}
                height='100%'
                style={{fontSize:16, height:'100%'}}
                />
            </div>
            <div className='min-h-0 w-full overflow-auto px-5 pb-4'>
                {/* TestCases Heading */}
                <div className='flex h-10 items-center space-x-6'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-white'>Testcases</div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'/>
                    </div> 
                </div>
                <div className="flex">
                    {/* case 1 */}
                    <div className="mr-2 items-start mt-2 text-white">
                        <div className="flex flex-wrap items-center gap-y-4">
                            <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                            hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                Case 1
                            </div>
                        </div>
                    </div>
                    <div className="mr-2 items-start mt-2 text-white">
                        <div className="flex flex-wrap items-center gap-y-4">
                            <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                            hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                Case 2
                            </div>
                        </div>
                    </div>
                    <div className="mr-2 items-start mt-2 text-white">
                        <div className="flex flex-wrap items-center gap-y-4">
                            <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3
                            hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                                Case 3
                            </div>
                        </div>
                    </div>
                </div>
                <div className="font-semibold my-4 min-w-0">
                    <p className='text-sm font-medium mt-4  text-white'>Input : </p>
                    <div className='w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 border-tarnsparent text-white mt-2 whitespace-pre-wrap wrap-break-word leading-6'>
                        nums : [2,7,11,15] , target : 9
                    </div>
                    <p className='text-sm font-medium mt-4  text-white'>Output : </p>
                    <div className='w-full min-w-0 cursor-text rounded-lg border px-4 py-2.5 bg-dark-fill-3 border-tarnsparent text-white mt-2 whitespace-pre-wrap wrap-break-word leading-6'>
                        [0,1]
                    </div>
                </div>
            </div>
        </Split>
        <EditorFooter/>
    </div>
}
export default Playground;