'use client'
import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';

type WorkflowProps = {
    
};

const Workflow:React.FC<WorkflowProps> = () => {
    
    return <Split className='split'>
        <ProblemDescription/>
        <div>The code Editor will be here</div>
    </Split>
}
export default Workflow;