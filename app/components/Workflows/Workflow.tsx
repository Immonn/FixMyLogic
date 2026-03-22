'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import ProblemDescription from './ProblemDescription';
import Playground from './Playground';

const Split = dynamic(() => import('react-split'), { ssr: false });

type WorkflowProps = {
    
};

const Workflow:React.FC<WorkflowProps> = () => {
    
    return <Split className='split h-full ' minSize={0}>
        <div className='h-full overflow-auto'>
            <ProblemDescription/>
        </div>
        <div className='h-full overflow-hidden'>
            <Playground/>
        </div>

    </Split>
}
export default Workflow;