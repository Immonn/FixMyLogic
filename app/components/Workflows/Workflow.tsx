'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ProblemDescription from './ProblemDescription';
import Playground from './Playground';
import { Problem } from '@/app/utils/types';
import Confetti from 'react-confetti';
const Split = dynamic(() => import('react-split'), { ssr: false });

import { useHasMounted } from '@/app/hooks/useHasMounted';

type WorkflowProps = {
    problem: Problem
};

const Workflow: React.FC<WorkflowProps> = ({ problem }) => {
    const [success, setSuccess] = useState(false);
    const [solved,setSolved]=useState(false);
    const hasMounted = useHasMounted();

    if (!hasMounted) return null;

    return <Split className='split h-full ' minSize={0}>
        <div className='h-full min-w-0 overflow-auto'>
            <ProblemDescription problem={problem} _solved={solved}/>
        </div>
        <div className='h-full min-w-0 overflow-hidden'>
            <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} success={success}/>
            {success && <Confetti gravity={0.3} tweenDuration={4000} />}
        </div>

    </Split>
}
export default Workflow;