'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import ProblemDescription from './ProblemDescription';
import Playground from './Playground';
import { Problem } from '@/app/utils/types';

const Split = dynamic(() => import('react-split'), { ssr: false });

type WorkflowProps = {
    problem:Problem
};

const Workflow:React.FC<WorkflowProps> = ({problem}) => {
    
    return <Split className='split h-full ' minSize={0}>
        <div className='h-full min-w-0 overflow-auto'>
            <ProblemDescription problem={problem}/>
        </div>
        <div className='h-full min-w-0 overflow-hidden'>
            <Playground problem={problem}/>
        </div>

    </Split>
}
export default Workflow;