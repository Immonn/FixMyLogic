'use client'
import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import Playground from './Playground';

type WorkflowProps = {
    
};

const Workflow:React.FC<WorkflowProps> = () => {
    
    return <Split className='split h-full ' minSize={0}>
        <div className='h-full overflow-auto'>
            <ProblemDescription/>
        </div>
        <div className='h-full overflow-auto'>
            <Playground/>
        </div>

    </Split>
}
export default Workflow;