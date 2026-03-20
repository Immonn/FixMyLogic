'use client'
import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';

type WorkflowProps = {
    
};

const Workflow:React.FC<WorkflowProps> = () => {
    
    return <Split className='split h-full ' minSize={0}>
        <div className='h-full overflow-auto'>
            <ProblemDescription/>
        </div>
        <div className='h-full overflow-auto bg-dark-layer-2 text-dark-gray-8'>
            <div className='h-11 flex items-center px-4 border-b border-dark-divider-border-2 text-sm'>
                Code Editor
            </div>
            <div className='p-4 text-sm text-dark-gray-7'>The code Editor will be here</div>
        </div>
    </Split>
}
export default Workflow;