'use client'
import React, { useEffect, useState } from 'react';
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
    const [showConfetti, setShowConfetti] = useState(false);
    const hasMounted = useHasMounted();

    useEffect(() => {
        if (success) {
            setShowConfetti(true);
            const t = setTimeout(() => setShowConfetti(false), 4000);
            return () => clearTimeout(t);
        }
    }, [success]);

    if (!hasMounted) return null;

    return <Split className='split h-full ' minSize={0}>
        <div className='h-full min-w-0 overflow-auto'>
            <ProblemDescription problem={problem} _solved={solved}/>
        </div>
        <div className='h-full min-w-0 overflow-hidden'>
            <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} success={success}/>
            {showConfetti && <Confetti gravity={0.3} tweenDuration={4000} numberOfPieces={500} recycle={false} />}
        </div>

    </Split>
}
export default Workflow;